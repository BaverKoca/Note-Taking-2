# Modern Note-Taking Application

A modern, feature-rich note-taking web application inspired by Evernote. Built with clean, responsive design and user experience in mind.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

### 📝 Notes
- Create, edit, and delete notes
- Real-time search functionality
- Rich text formatting
- Auto-save capability
- Responsive layout for all devices

### 📅 Digital Diary
- Calendar-based diary entries
- Daily thoughts and reflections
- Easy navigation between dates
- Visual indicators for days with entries

### 👤 User Management
- Secure user authentication
- Customizable user profiles
- Password protection
- Email verification support

### ⚙️ Personalization
- Multiple language support (English, Turkish, German, French)
- Dark/Light theme options
- System theme synchronization
- Adjustable font sizes
- Privacy settings
- Notification preferences

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend API Integration
- Responsive Design
- Local Storage for Settings
- Session Management
- RESTful API Architecture

## Getting Started

### Prerequisites
- Modern web browser
- Web server (local or remote)
- API backend server

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/note-taking-app.git
\`\`\`

2. Navigate to the project directory:
\`\`\`bash
cd note-taking-app
\`\`\`

3. Set up your web server to serve the files.

4. Configure the API endpoints in the JavaScript files if necessary.

### Usage

1. Open \`index.html\` in your web browser
2. Sign up for a new account or log in
3. Start creating notes, diary entries, and customizing your experience

## API Endpoints

### Authentication
- POST `/api/login` - User login
- POST `/api/signup` - New user registration
- POST `/api/logout` - User logout

### Notes
- GET `/api/notes` - Retrieve all notes
- POST `/api/notes` - Create new note
- PUT `/api/notes/:id` - Update existing note
- DELETE `/api/notes/:id` - Delete note

### Diary
- GET `/api/diary` - Get all diary entries
- GET `/api/diary/:date` - Get specific diary entry
- PUT `/api/diary/:date` - Update/create diary entry
- DELETE `/api/diary/:date` - Delete diary entry

### Profile
- GET `/api/profile` - Get user profile
- PUT `/api/profile` - Update user profile

### Session
- GET `/api/session` - Check session status

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by Evernote
- Icons and UI elements from modern design principles
- Special thanks to all contributors

## Contact

Baver Koca - [Your Email]
Project Link: [https://github.com/yourusername/note-taking-app](https://github.com/yourusername/note-taking-app)

---
Made with ❤️ by Baver Koca