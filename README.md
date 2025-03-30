# 🗣️ Max Web Forum

My full-stack web forum with real-time chat, user authentication, and post discussion features.

👉 **Live site**: [https://max-forum.com](https://max-forum.com)

---

## 🚀 Features

- 🔐 User Registration & Login with JWT
- 📝 Create, Edit, and Delete Posts
- 💬 Comment on posts
- 💡 Real-time chat room (Socket.io)
- 📦 MongoDB Atlas database
- 🌐 Frontend: Vercel | Backend: Render

---

## 🧰 Tech Stack

| Layer     | Tech Used                        |
|-----------|----------------------------------|
| Frontend  | Next.js, React, Bootstrap        |
| Backend   | Node.js, Express, Socket.io      |
| Database  | MongoDB Atlas                    |
| Auth      | JWT                              |
| Deploy    | Vercel (Frontend), Render (API)  |

---

## 🖥️ Live Demo

Visit: **[https://max-forum.com](https://max-forum.com)**  
Register an account, create posts, leave comments, and chat in real-time.

---

## 🧪 Local Development

### 1. Clone this repository
```bash
git clone https://github.com/Maxproto/forum-project.git
cd forum-project
```

### 2. Setup Environment Variables

Copy `.env` template:

```bash
cp server/.env.example server/.env
```

Fill in values like MongoDB URI and JWT secret.

---

### 3. Run Locally

#### 🧠 Backend

```bash
cd server
npm install
npm run dev
```

#### 🎨 Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

### server/.env

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

### client/.env.local

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://your-backend.onrender.com
```


## 👤 Author

**Maxproto**  
🔗 GitHub: [@Maxproto](https://github.com/Maxproto)

---

## 💡 Future Plans

- 👤 User profiles
- 🖼️ Upload images in posts
- 👍 Post likes and reactions
- 🔔 Real-time notifications
- 🛡️ Admin/moderator roles

---

## ✅ License

MIT — feel free to use and adapt!
