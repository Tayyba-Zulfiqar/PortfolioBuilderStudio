
```markdown
# 🌸 Bloom Portfolio Studio - Backend

> *The heart of Bloom Portfolio Studio.* 🎀🐰

This is the cozy, dreamy backend API for Bloom Portfolio Studio. Built with love, Node.js, Express, and MongoDB, it handles all the magic behind the scenes — from user authentication to portfolio data and analytics. ✨

---

## 🎀 What's Inside

| Module | Description | Emoji |
|--------|-------------|-------|
| 🔐 **Authentication** | Signup, Login, JWT, Email Verification | 🛡️ |
| 👤 **User Management** | Profile, Settings, Password Reset | 🌸 |
| 📝 **Portfolio CRUD** | Create, Read, Update, Delete portfolio data | ✏️ |
| 📊 **Analytics** | Track views, clicks, and popular sections | 📈 |
| ☁️ **File Upload** | Profile pictures and project images | 🖼️ |
| 🌍 **Public API** | Serve published portfolios to the world | 🌎 |
| 🐰 **Email Service** | Welcome emails, notifications | ✉️ |
| 🧁 **Data Validation** | Clean, secure data with Joi | ✅ |

---

## 🛠️ Tech Stack

| Layer | Technology | Emoji |
|-------|------------|-------|
| **Runtime** | Node.js | 🟢 |
| **Framework** | Express.js | 🚂 |
| **Database** | MongoDB + Mongoose ODM | 🍃 |
| **Authentication** | JWT + bcryptjs | 🔑 |
| **Email** | Nodemailer | ✉️ |
| **File Upload** | Cloudinary + Multer | ☁️ |
| **Validation** | Joi | ✅ |
| **Environment** | dotenv | 🔒 |
| **Dev Tools** | Nodemon | 🔄 |
| **Security** | Helmet, CORS | 🛡️ |

---

## 📁 Folder Structure

```

backend/ 

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
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   └── README.md
````

---

## 🚀 Getting Started

### 🧁 Prerequisites

- Node.js (v18 or higher) 🟢
- MongoDB (local or Atlas) 🍃
- npm or yarn 📦

### 🌸 Installation

```bash
cd backend
npm install
````

### 🐰 Environment Variables

Create a `.env` file in the backend folder:

```env
# 🌸 Server
PORT=5000
NODE_ENV=development

# 🍃 Database
MONGODB_URI=mongodb://127.0.0.1:27017/bloomportfolio

# 🔑 Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# ✉️ Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# ☁️ Cloudinary
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret

# 🌸 Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 🚂 Run the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

You'll see:

```
🌸 Bloom Portfolio Studio API
🐰 Server running on http://localhost:5000
🍃 Connected to MongoDB
✨ Ready to bloom!
```

---

## 🌸 API Endpoints

### 🔐 Authentication Routes

| Method | Endpoint                          | Description               | Emoji |
| ------ | --------------------------------- | ------------------------- | ----- |
| POST   | `/api/auth/signup`                | Create new user account   | 📝    |
| POST   | `/api/auth/login`                 | Login user                | 🔐    |
| GET    | `/api/auth/verify/:token`         | Verify email              | ✅     |
| POST   | `/api/auth/forgot-password`       | Send reset password email | ✉️    |
| POST   | `/api/auth/reset-password/:token` | Reset password            | 🔄    |
| GET    | `/api/auth/me`                    | Get current user          | 👤    |

### 📝 Portfolio Routes

| Method | Endpoint                      | Description           | Emoji |
| ------ | ----------------------------- | --------------------- | ----- |
| GET    | `/api/portfolio/:username`    | Get public portfolio  | 🌍    |
| GET    | `/api/portfolio/me`           | Get my portfolio      | 📖    |
| PUT    | `/api/portfolio`              | Update full portfolio | ✏️    |
| PUT    | `/api/portfolio/about`        | Update about section  | 🌸    |
| POST   | `/api/portfolio/projects`     | Add project           | 🚀    |
| PUT    | `/api/portfolio/projects/:id` | Update project        | ✨     |
| DELETE | `/api/portfolio/projects/:id` | Delete project        | 🗑️   |
| POST   | `/api/portfolio/skills`       | Add skill             | 🎀    |
| PUT    | `/api/portfolio/skills/:id`   | Update skill          | 🧁    |
| DELETE | `/api/portfolio/skills/:id`   | Delete skill          | ❌     |

### 📊 Analytics Routes

| Method | Endpoint                         | Description          | Emoji |
| ------ | -------------------------------- | -------------------- | ----- |
| GET    | `/api/analytics/views`           | Get view statistics  | 👁️   |
| GET    | `/api/analytics/clicks`          | Get click statistics | 🔗    |
| POST   | `/api/analytics/view/:username`  | Track a view         | 📈    |
| POST   | `/api/analytics/click/:username` | Track a click        | 🖱️   |

---

## 🐰 API Response Format

### ✅ Success Response

```json
{
  "success": true,
  "data": {
    "user": { ... },
    "portfolio": { ... }
  },
  "message": "Operation completed successfully 🌸"
}
```

### ❌ Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": "Detailed error message (dev only)"
}
```

---

## 📦 Database Models

### 👤 User Model

```javascript
{
  username: String,
  email: String,
  password: String,
  isVerified: Boolean,
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  portfolio: {
    about: {
      fullName: String,
      headline: String,
      bio: String,
      location: String,
      profilePicture: String,
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      youtube: String,
    },
    projects: [{
      title: String,
      description: String,
      techStack: [String],
      liveUrl: String,
      githubUrl: String,
      images: [String],
    }],
    skills: [{
      name: String,
      proficiency: String,
    }],
    experience: [{
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String,
      logo: String,
    }],
    education: [{
      degree: String,
      institution: String,
      year: Number,
      gpa: Number,
    }],
    template: String,
    isPublished: Boolean,
    theme: {
      primaryColor: String,
      secondaryColor: String,
    }
  },

  views: Number,
  analytics: {
    views: [{
      timestamp: Date,
      ip: String,
      userAgent: String,
      referrer: String,
    }],
    clicks: [{
      link: String,
      timestamp: Date,
    }]
  }
}
```

---

## 🔐 Authentication Flow

```
1. 📝 User signs up
   ↓
2. ✉️ Email verification sent
   ↓
3. ✅ User verifies email
   ↓
4. 🔐 User logs in
   ↓
5. 🎀 JWT token generated
   ↓
6. 🛡️ Token sent in Authorization header
   ↓
7. 🌸 Access protected routes
```

---

## 🧁 Dependencies

```json
{
  "dependencies": {
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
    "express-rate-limit": "^6.7.0",
    "express-validator": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^29.5.0",
    "supertest": "^6.3.0"
  }
}
```

---

## 🪄 Utility Functions

### ✉️ Email Templates

* sendWelcomeEmail(email, username)
* sendVerificationEmail(email, token)
* sendResetPasswordEmail(email, token)
* sendPortfolioPublishedEmail(email, username)

### 🔑 JWT Helpers

* generateToken(userId)
* verifyToken(token)
* decodeToken(token)

### ☁️ Cloudinary Upload

* uploadImage(file, folder)
* deleteImage(publicId)
* getOptimizedUrl(publicId, options)

---

## 🎀 Error Handling

| Code | Description      |
| ---- | ---------------- |
| 400  | Bad Request      |
| 401  | Unauthorized     |
| 403  | Forbidden        |
| 404  | Not Found        |
| 409  | Conflict         |
| 422  | Validation Error |
| 500  | Server Error     |

---

## 🌱 Seeders

```bash
npm run seed
```

---

## 🧪 Testing

```bash
npm test
npm run test:coverage
```

---



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


```
