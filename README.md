# 🚀 QuickChat Frontend

**QuickChat Frontend** is a modern real-time chat application client built with **React 19** and **Vite**, designed for speed, scalability, and an excellent developer experience. It connects to a backend server via **Socket.io** to deliver instant messaging with user authentication.

---

## 🧩 Project Overview

- **Name:** QuickChat Frontend  
- **Type:** Real-time Chat Application (Client-side)  
- **Build Tool:** Vite  

---

## 🛠️ Tech Stack

### Core
- **Framework:** React 19  
- **Bundler:** Vite  

### Styling
- **Tailwind CSS v4** (via `@tailwindcss/vite`)  

### Routing
- **React Router DOM v7**

### Networking
- **Socket.io Client** – real-time communication  
- **Axios** – HTTP requests  

### UX Enhancements
- **React Hot Toast** – notifications & alerts  

### State Management
- **React Context API**

---

## Project Structure

src/
├── components/        # Reusable UI components
├── pages/             # Page-level components (Login, Signup, Chat)
├── lib/               # Utility functions and helpers
├── assets/            # Images and static resources
├── context/           # Global state management
│   ├── AuthContext.jsx  # Authentication state & logic
│   └── ChatContext.jsx  # Chat messages & socket connection
├── App.jsx
├── main.jsx
└── index.css  






---

## 🔑 Environment Variables

Create a `.env` file in the project root and add:
VITE_BACKEND_URL=http://localhost:3000

Runs ESLint to maintain code quality.

---

## ✨ Key Features

- 🔴 Real-time messaging with **Socket.io**
- 🔐 User authentication (Login & Signup)
- ⚡ Fast builds and dev experience with **Vite**
- 🎨 Modern UI with **Tailwind CSS**
- 🌐 Client-side routing using **React Router**
- 🔔 Toast notifications via **React Hot Toast**

---

## 📌 Prerequisites

- Node.js **v18+**
- npm or pnpm
- Running QuickChat Backend server

---

## 🚧 Future Enhancements

- Group chats
- Typing indicators
- Read receipts
- Online/offline user status
- File and image sharing

---

## 📄 License

This project is intended for learning and development purposes.  
You may add an open-source license (MIT, Apache 2.0, etc.) if required.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.  
Feel free to fork the project and submit a pull request.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!



