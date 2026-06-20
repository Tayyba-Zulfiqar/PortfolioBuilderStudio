

```markdown
# 🌸 Bloom Portfolio Studio

> *Build your story, beautifully.* ✨🐰

Welcome to Bloom Portfolio Studio — the dreamiest way to build and share your professional portfolio! Whether you're a developer, designer, artist, or creative soul, this platform helps you showcase your work with a soft, feminine touch. No code needed, just pure magic. 🌷✨

---

## 🌸 The Vibe

| Element | Vibe |
|---------|------|
| 🎨 **Design** | Soft, dreamy, pastel pink aesthetic |
| 🌸 **Colors** | #F4A6B5 (pink), #FFF8F7 (warm white) |
| ✨ **Typography** | Playfair Display + Quicksand |
| 🐰 **Feel** | Like a cozy café with pink lighting |


---

## ✨ Features

| Feature | Description | Emoji |
|---------|-------------|-------|
| 🎨 **Dreamy UI** | Soft pastel design with #F4A6B5 pink theme | 🌸 |
| 📝 **Drag & Drop Editor** | Build your portfolio visually, no code needed | ✨ |
| 🎯 **Multiple Templates** | Choose from Modern, Minimal, and Creative styles | 🎀 |
| 👀 **Live Preview** | See changes in real-time as you edit | 👁️ |
| 📊 **Analytics Dashboard** | Track views, popular sections, and link clicks | 📈 |
| 🌍 **Explore Community** | Discover and get inspired by other portfolios | 🌎 |
| 🔗 **Custom URL** | Get your own `username.bloomportfolio.com` | 🌐 |
| 📱 **Fully Responsive** | Looks beautiful on all devices | 📱 |
| 🚀 **One-Click Publish** | Share your story with the world instantly | ✨ |
| 🔐 **Secure Auth** | JWT authentication with email verification | 🛡️ |

---

## 🛠️ Tech Stack

### 🎀 Frontend

| Layer | Technology | Emoji |
|-------|------------|-------|
| **Framework** | React.js | ⚛️ |
| **Styling** | Tailwind CSS + shadcn/ui | 🎨 |
| **State Management** | Zustand | 🐻 |
| **Routing** | React Router v6 | 🗺️ |
| **Forms** | React Hook Form | 📝 |
| **Animations** | Framer Motion | ✨ |
| **Icons** | Lucide React | 💖 |
| **HTTP Client** | Axios | 📡 |
| **Build Tool** | Vite | ⚡ |

### 🧁 Backend

| Layer | Technology | Emoji |
|-------|------------|-------|
| **Runtime** | Node.js | 🟢 |
| **Framework** | Express.js | 🚂 |
| **Database** | MongoDB + Mongoose ODM | 🍃 |
| **Authentication** | JWT + bcryptjs | 🔑 |
| **Email** | Nodemailer | ✉️ |
| **File Upload** | Cloudinary + Multer | ☁️ |
| **Validation** | Joi | ✅ |
| **Security** | Helmet, CORS, Rate Limiting | 🛡️ |

---

## 📁 Project Structure

bloom-portfolio-studio/

├── backend 🌷
│   ├── src
│   │   ├── models
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middleware
│   │   ├── config
│   │   ├── utils
│   │   └── validators
│
├── frontend 🌸
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── templates
│   │   ├── store
│   │   ├── hooks
│   │   ├── services
│   │   └── utils

---

## 🚀 Getting Started

### 🧁 Prerequisites

- Node.js (v18 or higher) 🟢
- MongoDB (local or Atlas) 🍃
- npm or yarn 📦

### 🌸 Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/bloom-portfolio-studio.git
cd bloom-portfolio-studio
````

**2. Setup Backend**

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**3. Setup Frontend**

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

**4. Open your browser**

```
🌸 Frontend: http://localhost:5173
🐰 Backend:  http://localhost:5000
```

---

## 🌸 API Endpoints Overview

| Method | Endpoint                   | Description             |
| ------ | -------------------------- | ----------------------- |
| POST   | `/api/auth/signup`         | Create new user account |
| POST   | `/api/auth/login`          | Login user              |
| GET    | `/api/portfolio/:username` | Get public portfolio    |
| PUT    | `/api/portfolio`           | Update portfolio        |
| POST   | `/api/portfolio/projects`  | Add project             |
| GET    | `/api/analytics/views`     | Get view statistics     |

> *Full API documentation available in the Backend README!* 📖

---

## 🗺️ Pages & Routes

| Route        | Page             | Description                   |
| ------------ | ---------------- | ----------------------------- |
| `/`          | Landing Page     | Dreamy marketing page         |
| `/signup`    | Signup Page      | Create new account            |
| `/login`     | Login Page       | Existing user login           |
| `/dashboard` | Dashboard        | Build your portfolio          |
| `/explore`   | Explore Page     | Discover community portfolios |
| `/:username` | Public Portfolio | View someone's portfolio      |
| `/analytics` | Analytics        | Track portfolio performance   |

---

## 🎨 Design System

### 🌸 Color Palette

| Name                   | Hex       | Usage                    |
| ---------------------- | --------- | ------------------------ |
| 🌸 **Main Pink**       | `#F4A6B5` | Primary buttons, accents |
| 🌷 **Secondary Pink**  | `#F8C8D4` | Hovers, soft backgrounds |
| 🌹 **Accent Pink**     | `#E8B4B8` | Borders, highlights      |
| 🤍 **Background**      | `#FFF8F7` | Cozy page background     |
| 📄 **Card Background** | `#FFFBF9` | Cards, modals            |
| ✨ **Text Dark**        | `#4A3A3A` | Headings                 |
| 📝 **Text Medium**     | `#7A6B6B` | Body text                |
| 🌫️ **Text Light**     | `#B5A4A4` | Placeholders             |
| 🐰 **Pastel Purple**   | `#D4C5D9` | Accents                  |
| 🧁 **Mint Green**      | `#D4E9D6` | Success states           |

---

## 📦 Dependencies

### 🎀 Frontend

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.10.0",
  "tailwindcss": "^3.3.0",
  "zustand": "^4.3.0",
  "react-hook-form": "^7.43.0",
  "framer-motion": "^10.12.0",
  "lucide-react": "^0.200.0",
  "axios": "^1.3.0",
  "vite": "^4.3.0"
}
```

### 🧁 Backend

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "nodemailer": "^6.9.0",
  "cloudinary": "^1.37.0",
  "multer": "^1.4.5-lts.1",
  "joi": "^17.9.0",
  "helmet": "^7.0.0",
  "express-rate-limit": "^6.7.0"
}
```

---

## 🌱 Environment Variables

### 🌸 Backend

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bloomportfolio
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 🎀 Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Deployment

* Render 🌐
* Railway 🚂
* Vercel 🌸
* Netlify 🎀

---

## 🧪 Testing

```bash
cd backend
npm test

cd frontend
npm test
```

---

## 🤝 Contributing

1. 🍴 Fork repo
2. 🌿 Create branch
3. ✨ Commit changes
4. 🚀 Push
5. 🎀 Open PR

---



---

## 🌟 Support

⭐ Star this repo if you like it!

---

## 📧 Contact

* Developer: Tayyba Zulfiqar
* Email: [tayybazulfiqar786@gmail.com](mailto:tayybazulfiqar786@gmail.com)
* GitHub: @Tayyba-Zulfiqar

---


*"Build your story, beautifully."* 🌷✨

---

Made with 💖 by Tayyba Zulfiqar

```


```
