// Backend server for authentication, session, and notes (Node.js + Express + SQLite)
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static('.'));
app.use(session({
  secret: 'evernote_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
}));

// SQLite setup
const db = new sqlite3.Database('evernote.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    name TEXT,
    surname TEXT,
    mail TEXT,
    phone TEXT,
    password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    content TEXT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS diary_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT,
    title TEXT,
    content TEXT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    UNIQUE(user_id, date)
  )`);
});

// Auth endpoints
app.post('/api/signup', (req, res) => {
  const { username, name, surname, mail, phone, password } = req.body;
  if (!username || !name || !surname || !mail || !password) return res.status(400).json({ error: 'Missing fields' });
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (user) return res.status(409).json({ error: 'User exists' });
    const hash = bcrypt.hashSync(password, 10);
    db.run('INSERT INTO users (username, name, surname, mail, phone, password) VALUES (?, ?, ?, ?, ?, ?)', [username, name, surname, mail, phone || '', hash], function(err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      req.session.userId = this.lastID;
      res.json({ success: true });
    });
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.userId = user.id;
    res.json({ success: true });
  });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.get('/api/session', (req, res) => {
  if (req.session.userId) return res.json({ loggedIn: true });
  res.json({ loggedIn: false });
});

// Notes endpoints
app.get('/api/notes', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  db.all('SELECT * FROM notes WHERE user_id = ? ORDER BY updated DESC', [req.session.userId], (err, rows) => {
    res.json(rows);
  });
});

app.post('/api/notes', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  const { title, content } = req.body;
  db.run('INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)', [req.session.userId, title, content], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ id: this.lastID });
  });
});

app.put('/api/notes/:id', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  const { title, content } = req.body;
  db.run('UPDATE notes SET title = ?, content = ?, updated = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?', [title, content, req.params.id, req.session.userId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ success: true });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  db.run('DELETE FROM notes WHERE id = ? AND user_id = ?', [req.params.id, req.session.userId], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ success: true });
  });
});

// Profile endpoints
app.get('/api/profile', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  db.get('SELECT username, name, surname, mail, phone FROM users WHERE id = ?', [req.session.userId], (err, user) => {
    if (err || !user) return res.status(500).json({ error: 'DB error' });
    res.json(user);
  });
});

app.put('/api/profile', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  const { name, surname, mail, phone, password } = req.body;
  if (!name || !surname || !mail) return res.status(400).json({ error: 'Missing fields' });
  let query = 'UPDATE users SET name = ?, surname = ?, mail = ?, phone = ?';
  let params = [name, surname, mail, phone || '', req.session.userId];
  if (password && password.trim()) {
    const hash = bcrypt.hashSync(password, 10);
    query = 'UPDATE users SET name = ?, surname = ?, mail = ?, phone = ?, password = ? WHERE id = ?';
    params = [name, surname, mail, phone || '', hash, req.session.userId];
  } else {
    query += ' WHERE id = ?';
  }
  db.run(query, params, function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ success: true });
  });
});

// Diary endpoints
app.get('/api/diary', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  db.all('SELECT date, title, content FROM diary_entries WHERE user_id = ? ORDER BY date DESC', [req.session.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

app.get('/api/diary/:date', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  db.get('SELECT title, content FROM diary_entries WHERE user_id = ? AND date = ?', [req.session.userId, req.params.date], (err, entry) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(entry || { error: 'Entry not found' });
  });
});

app.put('/api/diary/:date', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
  
  db.run(`INSERT INTO diary_entries (user_id, date, title, content) 
          VALUES (?, ?, ?, ?)
          ON CONFLICT(user_id, date) 
          DO UPDATE SET title = ?, content = ?, updated = CURRENT_TIMESTAMP`,
    [req.session.userId, req.params.date, title, content, title, content],
    function(err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ success: true });
    }
  );
});

app.delete('/api/diary/:date', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  db.run('DELETE FROM diary_entries WHERE user_id = ? AND date = ?', [req.session.userId, req.params.date], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
