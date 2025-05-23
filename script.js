// Shared JS for both index.html and note.html

// Navbar logo scroll/redirect
const logo = document.getElementById('logo-link');
if (logo) {
  // On index.html scroll to Why Evernote, on note.html scroll to top
  logo.addEventListener('click', function() {
    const why = document.getElementById('why-evernote');
    if (why) {
      why.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// Log out (note.html)
const logout = document.getElementById('logout-link');
if (logout) {
  logout.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'index.html';
  });
}

// Smooth scroll for nav links (index.html)
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Login/Sign Up popup logic (index.html)
const loginLink = document.getElementById('login-link');
const loginPopup = document.getElementById('login-popup');
const popupOverlay = document.getElementById('popup-overlay');
if (loginLink && loginPopup && popupOverlay) {
  loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginPopup.style.display = 'block';
    popupOverlay.style.display = 'block';
  });
  document.getElementById('close-popup').addEventListener('click', function() {
    loginPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
  });
  // Tab logic
  document.getElementById('show-login').onclick = function() {
    document.getElementById('login-form').style.display = '';
    document.getElementById('signup-form').style.display = 'none';
    this.style.background = '#3b82f6';
    this.style.color = '#fff';
    document.getElementById('show-signup').style.background = '#f3f4f6';
    document.getElementById('show-signup').style.color = '#374151';
  };
  document.getElementById('show-signup').onclick = function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = '';
    this.style.background = '#3b82f6';
    this.style.color = '#fff';
    document.getElementById('show-login').style.background = '#f3f4f6';
    document.getElementById('show-login').style.color = '#374151';
  };
  document.getElementById('show-login').click();
  // Login form demo
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    if(username && password) {
      // Redirect to note.html on successful login
      window.location.href = 'note.html';
    } else {
      document.getElementById('login-error').textContent = 'Please enter username and password.';
      document.getElementById('login-error').style.display = 'block';
    }
  });
  // Sign up form demo
  document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const name = document.getElementById('signup-name').value.trim();
    const surname = document.getElementById('signup-surname').value.trim();
    const mail = document.getElementById('signup-mail').value.trim();
    const password = document.getElementById('signup-password').value;
    if(username && name && surname && mail && password) {
      alert('Account created for ' + username);
      document.getElementById('login-form').style.display = '';
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('show-login').style.background = '#3b82f6';
      document.getElementById('show-login').style.color = '#fff';
      document.getElementById('show-signup').style.background = '#f3f4f6';
      document.getElementById('show-signup').style.color = '#374151';
    } else {
      document.getElementById('signup-error').textContent = 'Please fill all required fields.';
      document.getElementById('signup-error').style.display = 'block';
    }
  });
}

const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const savedNotesList = document.querySelector('.saved-notes-list');
const saveBtn = document.querySelector('.save-btn');
let notes = document.querySelectorAll(".input-box");
let editingSavedNoteIdx = null; // Track which saved note is being edited

function getNotesArray() {
    // Parse notes from localStorage, fallback to empty array
    const notesHTML = localStorage.getItem("notes") || "";
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = notesHTML;
    const noteElements = tempDiv.querySelectorAll('.input-box');
    return Array.from(noteElements).map(el => el.innerText.replace(/\n+$/, '').trim()).filter(Boolean);
}

function getSavedNotesArray() {
    // Support both old (string) and new (object) format
    const arr = JSON.parse(localStorage.getItem("savedNotes") || "[]");
    return arr.map(n => typeof n === 'string' ? { title: '', text: n } : n);
}
function setSavedNotesArray(arr) {
    localStorage.setItem("savedNotes", JSON.stringify(arr));
}

function renderSavedNotes() {
    const notesArr = getSavedNotesArray();
    savedNotesList.innerHTML = '';
    notesArr.forEach((note, idx) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'saved-note-item';
        // Show title and preview
        const title = note.title || '';
        const preview = note.text ? note.text.slice(0, 40) + (note.text.length > 40 ? '...' : '') : '';
        noteDiv.innerHTML = `<div class="saved-title">${title}</div><div class="saved-preview">${preview}</div>`;
        noteDiv.title = title + (preview ? ' - ' + preview : '');
        noteDiv.onclick = () => {
            openSavedNote(idx);
        };
        savedNotesList.appendChild(noteDiv);
    });
}

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
    renderSavedNotes();
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
    renderSavedNotes();
}

createBtn.addEventListener("click", ()=>{
    // Create a container for title and note
    let noteWrapper = document.createElement("div");
    noteWrapper.className = "note-wrapper";
    // Title input (no label)
    let titleInput = document.createElement("input");
    titleInput.className = "note-title-input";
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Note Title");
    noteWrapper.appendChild(titleInput);
    // Note content
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.setAttribute("placeholder", "Write your note here...");
    img.src = "Trash.png";
    img.alt = "Delete";
    inputBox.appendChild(img);
    noteWrapper.appendChild(inputBox);
    notesContainer.appendChild(noteWrapper);
    updateStorage();
})

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName == "IMG"){
        // Show confirmation popup before deleting
        const confirmDiv = document.createElement('div');
        confirmDiv.className = 'delete-confirm-popup';
        confirmDiv.style.position = 'fixed';
        confirmDiv.style.top = '50%';
        confirmDiv.style.left = '50%';
        confirmDiv.style.transform = 'translate(-50%, -50%)';
        confirmDiv.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)';
        confirmDiv.style.border = 'none';
        confirmDiv.style.borderRadius = '18px';
        confirmDiv.style.boxShadow = '0 8px 32px rgba(59,130,246,0.13), 0 1.5px 8px rgba(0,0,0,0.08)';
        confirmDiv.style.padding = '38px 36px 28px 36px';
        confirmDiv.style.zIndex = '1000';
        confirmDiv.style.textAlign = 'center';
        confirmDiv.style.minWidth = '320px';
        confirmDiv.style.maxWidth = '90vw';
        confirmDiv.style.fontFamily = 'Segoe UI, Arial, sans-serif';
        confirmDiv.innerHTML = `
            <div style="font-size:1.22rem;font-weight:600;margin-bottom:18px;color:#2d3a4a;letter-spacing:0.2px;">Delete Note?</div>
            <div style="font-size:1.04rem;color:#4b5563;margin-bottom:28px;">This action cannot be undone. Are you sure you want to delete this note?</div>
            <div style="display:flex;gap:22px;justify-content:center;">
                <button class="confirm-yes" style="background:linear-gradient(90deg,#ef4444 0%,#f87171 100%);color:#fff;border:none;padding:10px 32px;border-radius:8px;font-size:1.08rem;font-weight:500;cursor:pointer;box-shadow:0 2px 8px rgba(239,68,68,0.08);transition:background 0.2s,box-shadow 0.2s;">Yes, Delete</button>
                <button class="confirm-no" style="background:linear-gradient(90deg,#f3f4f6 0%,#e5e7eb 100%);color:#374151;border:none;padding:10px 32px;border-radius:8px;font-size:1.08rem;font-weight:500;cursor:pointer;box-shadow:0 2px 8px rgba(59,130,246,0.04);transition:background 0.2s,box-shadow 0.2s;">Cancel</button>
            </div>
        `;
        document.body.appendChild(confirmDiv);
        // Disable background interaction
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(59,130,246,0.10)';
        overlay.style.zIndex = '999';
        overlay.style.backdropFilter = 'blur(2.5px)';
        document.body.appendChild(overlay);
        confirmDiv.querySelector('.confirm-yes').onclick = function() {
            // Remove from savedNotes if editing a saved note
            if (editingSavedNoteIdx !== null) {
                const savedArr = getSavedNotesArray();
                savedArr.splice(editingSavedNoteIdx, 1);
                setSavedNotesArray(savedArr);
                editingSavedNoteIdx = null;
            }
            // Remove the entire note-wrapper (which contains both title and note)
            const noteWrapper = e.target.closest('.note-wrapper');
            if (noteWrapper) noteWrapper.remove();
            document.body.removeChild(confirmDiv);
            document.body.removeChild(overlay);
            updateStorage();
        };
        confirmDiv.querySelector('.confirm-no').onclick = function() {
            document.body.removeChild(confirmDiv);
            document.body.removeChild(overlay);
        };
    }
    else if(e.target.tagName == "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

// Remove all note titles from the page
const allTitles = document.querySelectorAll('.note-title-input');
allTitles.forEach(title => title.remove());

function saveFirstNote() {
    const noteWrapper = notesContainer.querySelector('.note-wrapper');
    if (noteWrapper) {
        const titleInput = noteWrapper.querySelector('.note-title-input');
        const inputBox = noteWrapper.querySelector('.input-box');
        const noteTitle = titleInput ? titleInput.value.trim() : '';
        const noteText = inputBox.innerText.replace(/\n+$/, '').trim();
        if (noteTitle || noteText) {
            let savedArr = getSavedNotesArray();
            if (editingSavedNoteIdx !== null) {
                // Remove the old note and add updated note to the top
                savedArr.splice(editingSavedNoteIdx, 1);
                savedArr.unshift({ title: noteTitle, text: noteText });
            } else {
                // Add as new saved note to the top
                savedArr.unshift({ title: noteTitle, text: noteText });
            }
            setSavedNotesArray(savedArr);
        }
        noteWrapper.remove();
        editingSavedNoteIdx = null; // Reset after saving
        updateStorage();
    }
}

saveBtn.addEventListener('click', saveFirstNote);

function openSavedNote(idx) {
    const savedArr = getSavedNotesArray();
    if (savedArr[idx]) {
        // Replace all notes with the selected saved note for editing
        notesContainer.innerHTML = '';
        let noteWrapper = document.createElement("div");
        noteWrapper.className = "note-wrapper";
        // Title input (no label)
        let titleInput = document.createElement("input");
        titleInput.className = "note-title-input";
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("placeholder", "Note Title");
        titleInput.value = savedArr[idx].title || '';
        noteWrapper.appendChild(titleInput);
        let inputBox = document.createElement("p");
        let img = document.createElement("img");
        inputBox.className = "input-box";
        inputBox.setAttribute("contenteditable", "true");
        inputBox.setAttribute("placeholder", "Write your note here...");
        inputBox.innerText = savedArr[idx].text || '';
        img.src = "Trash.png";
        img.alt = "Delete";
        inputBox.appendChild(img);
        noteWrapper.appendChild(inputBox);
        notesContainer.appendChild(noteWrapper);
        editingSavedNoteIdx = idx; // Set the index being edited
        updateStorage();
    }
}