# Modern Note-Taking Application

A comprehensive, feature-rich note-taking web application inspired by Evernote. Designed with a focus on clean, responsive UI and an exceptional user experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Key Features

### 📝 Notes
- Effortlessly create, edit, and delete notes
- Instant, real-time search across all notes
- Advanced rich text formatting options
- Automatic saving to prevent data loss
- Fully responsive layout for seamless use on any device

### 📅 Digital Diary
- Calendar-based interface for daily diary entries
- Capture daily thoughts and reflections
- Intuitive navigation between dates
- Visual indicators highlighting days with entries

### 👤 User Management
- Secure user authentication and session management
- Customizable user profiles
- Password protection and email verification

### ⚙️ Personalization
- Multi-language support: English, Turkish, German, French
- Light and dark theme options with system theme sync
- Adjustable font sizes for accessibility
- Comprehensive privacy controls
- Customizable notification preferences

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** RESTful API integration
- **Design:** Responsive, mobile-first approach
- **Storage:** Local storage for user settings
- **Session:** Robust session management

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Web server (local or remote)
- API backend server (for full functionality)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/note-taking-app.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd note-taking-app
   ```
3. **Set up your web server** to serve the project files.
4. **Configure API endpoints** in the JavaScript files as needed.

### Usage

1. Open `index.html` in your preferred web browser.
2. Register a new account or log in with existing credentials.
3. Start creating notes, diary entries, and personalize your experience.

## 📚 API Endpoints

### Authentication
- `POST /api/login` — User login
- `POST /api/signup` — New user registration
- `POST /api/logout` — User logout

### Notes
- `GET /api/notes` — Retrieve all notes
- `POST /api/notes` — Create a new note
- `PUT /api/notes/:id` — Update an existing note
- `DELETE /api/notes/:id` — Delete a note

### Diary
- `GET /api/diary` — Retrieve all diary entries
- `GET /api/diary/:date` — Retrieve a specific diary entry
- `PUT /api/diary/:date` — Create or update a diary entry
- `DELETE /api/diary/:date` — Delete a diary entry

### Profile
- `GET /api/profile` — Retrieve user profile
- `PUT /api/profile` — Update user profile

### Session
- `GET /api/session` — Check session status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request for review

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Evernote
- Icons and UI elements based on modern design principles
- Special thanks to all contributors

## 📬 Contact

**Baver Koca**  
Email: [Your Email]  
Project Repository: [https://github.com/yourusername/note-taking-app](https://github.com/yourusername/note-taking-app)