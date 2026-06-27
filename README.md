# 🌌 EventNexus AI

### *Next-Generation AI Powered Event Management Ecosystem*

<p align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge\&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?style=for-the-badge\&logo=springboot)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge\&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge\&logo=postgresql)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-blueviolet?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge\&logo=docker)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

</p>

---

## 🚀 Overview

**EventNexus AI** is a modern AI-powered Event Management Platform that automates planning, scheduling, attendee coordination, and workflow management.

Built using **Spring Boot**, **React**, **PostgreSQL**, and **OpenRouter AI**, the platform delivers intelligent event recommendations while maintaining enterprise-grade security and cloud scalability.

---

# ✨ Features

### 🤖 AI Event Assistant

* Intelligent event planning
* Smart schedule recommendations
* AI-generated event insights
* Context-aware workflow automation

### 📅 Smart Event Management

* Create & manage events
* Event timeline management
* Organizer dashboard
* Attendee coordination

### 🔐 Secure Authentication

* Dual-layer Email OTP verification
* Secure login system
* Protected REST APIs
* Encrypted communication

### ☁️ Cloud Native

* Deployable on Render
* Neon PostgreSQL Cloud
* Docker support
* Scalable architecture

### 📊 Database Management

* Spring Data JPA
* Hibernate ORM
* PostgreSQL
* Optimized entity mapping

---

# 🏗️ System Architecture

```text
                     🌐 EventNexus AI Architecture

+-------------------------+
|     React Frontend      |
|       (Vercel)          |
+------------+------------+
             |
             | REST APIs
             |
+------------v------------+
| Spring Boot Backend     |
| Java 17 + Maven         |
+------------+------------+
             |
   +---------+---------+
   |                   |
   |                   |
+--v----+         +----v-----+
| Neon  |         |OpenRouter|
|Postgres|        |    AI     |
+--------+         +----------+
```

---

# 🛠 Tech Stack

| Layer            | Technology                  |
| ---------------- | --------------------------- |
| Frontend         | React.js + Vite             |
| Backend          | Spring Boot 3.2             |
| Language         | Java 17                     |
| Database         | PostgreSQL (Neon)           |
| ORM              | Hibernate + Spring Data JPA |
| AI               | OpenRouter API              |
| Authentication   | Email OTP                   |
| Deployment       | Render + Vercel             |
| Containerization | Docker                      |
| Build Tool       | Maven                       |

---

# 📂 Project Structure

```text
EventNexus-AI
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── security
│   └── resources
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── assets
│
├── Dockerfile
├── README.md
└── pom.xml
```

---

# ⚙️ Local Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/EventNexus-AI.git

cd EventNexus-AI
```

---

## 2️⃣ Backend Setup

Navigate to:

```text
backend/src/main/resources/application.properties
```

Configure:

```properties
server.port=8080

# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/eventnexus
spring.datasource.username=your_username
spring.datasource.password=your_password

# OpenRouter
openrouter.api.key=YOUR_API_KEY

# Mail
spring.mail.username=YOUR_EMAIL
spring.mail.password=YOUR_APP_PASSWORD
```

Run backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

---

## 3️⃣ Frontend Setup

Update API URL

```javascript
const API_BASE_URL = "http://localhost:8080";
```

Run

```bash
cd frontend

npm install

npm run dev
```

---

# 🐳 Docker

Build Image

```bash
docker build -t eventnexus-backend .
```

Run Container

```bash
docker run -p 8080:8080 eventnexus-backend
```

---

# 🔄 REST API Flow

```text
User
   │
   ▼
React Frontend
   │
REST API
   │
Spring Boot Backend
   │
 ├── PostgreSQL
 └── OpenRouter AI
```

---

# 📸 Screenshots

> Add screenshots of your application here.

```
Home Page

Dashboard

Event Creation

AI Assistant

Login

Registration
```

---

# 🎯 Future Enhancements

* 📱 Mobile Application
* 🤖 AI Chat Assistant
* 🎫 QR Ticket Generation
* 📍 Live Event Tracking
* 💳 Online Payment Gateway
* 📊 Analytics Dashboard
* 📅 Google Calendar Integration
* 🔔 Push Notifications
* 👥 Team Collaboration
* 🎥 Virtual Event Support

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Priyam Shrivastava**

Full Stack Java Developer

* Java
* Spring Boot
* React
* PostgreSQL
* AI Integration
* Docker
* Cloud Deployment

---

# ⭐ Support

If you like this project, don't forget to **⭐ Star the repository!**

It motivates future development and helps others discover EventNexus AI.

---

<p align="center">
Made with ❤️ using Java • Spring Boot • React • AI
</p>
