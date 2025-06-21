# NoteNest: Modern Note-Taking Application

A comprehensive, feature-rich note-taking web application inspired by NoteNest. Designed for a seamless, responsive, and intuitive user experience.

## Screenshots

![Image](https://github.com/user-attachments/assets/7a47ed19-e57c-4db0-b013-4fcfcf57160d)
![Image](https://github.com/user-attachments/assets/c5617ab6-1db4-4e40-88d8-c6f685aa503a)
![Image](https://github.com/user-attachments/assets/74a60400-ece7-452d-92c9-1be6f5592c0a)
![Image](https://github.com/user-attachments/assets/c59ddbac-22fb-47c5-95f8-ab18fcb5bfd2)
![Image](https://github.com/user-attachments/assets/a931c992-d7aa-42a3-aac9-9954b4103f36)
![Image](https://github.com/user-attachments/assets/45030ecf-d732-4bdc-b279-6cfe650e1e91)

## ✨ Key Features

### 📝 Notes
- Effortlessly create, edit, and delete notes
- Instant, real-time search across all notes
- Advanced rich text formatting options
- Automatic saving to prevent data loss
- Fully responsive layout for all devices

### 📅 Digital Diary
- Calendar-based interface for daily diary entries
- Capture daily thoughts and reflections
- Intuitive navigation between dates
- Visual indicators for days with entries

### 👤 User Management
- Secure user authentication and session management
- Customizable user profiles
- Password protection and email verification

### ⚙️ Personalization
- Multi-language support: English, Turkish, German, French, Spanish, Russian
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
   git clone https://github.com/BaverKoca/Note-Taking-2.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd Note-Taking-2
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

## 🙏 Acknowledgments

- Design inspiration from NoteNest
- Icons and UI elements based on modern design principles
- Special thanks to all contributors

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
