# 🚀 CodePilotX — Mini Code Generation Copilot

A minimal full-stack **AI Code Generation Copilot** that allows users to generate code from natural language prompts using Google **Gemini AI**, with history tracking and pagination.

---

## ✨ Features

- Enter a natural language prompt and generate code instantly.
- Choose from multiple languages: **Python, JavaScript, C++, TypeScript**.
- Real **Gemini API** integration (not mocked).
- View previously generated code in a **paginated history**.
- Re-open old results from history.
- Copy code to clipboard.
- Delete individual items or clear all.
- Light/Dark theme supported.

---

## 🏗️ Architecture Overview

### 🔁 High-Level Flow

1. User enters a **prompt** and selects a **language**.
2. Frontend calls `POST /api/generate` to backend.
3. Backend sends prompt to **Gemini API** and receives generated code.
4. Backend stores result in **PostgreSQL**.
5. Frontend queries `GET /api/history?page=...` for paginated history.
6. Users can load, delete or clear generation history.

### 🧰 Tech Stack

| Layer | Tools |
|-------|-------|
| **Frontend** | Next.js (App Router), TailwindCSS, Axios, highlight.js |
| **Backend** | Node.js + Express |
| **Database** | PostgreSQL (Neon) |
| **AI** | Google Gemini API |
| **Other** | dotenv, `pg`, migrations SQL |

---

## 📁 Folder Structure

```bash
.
├─ backend/
│  ├─ package.json
│  ├─ .env.example
│  ├─ migrations/
│  │  └─ 001_init.sql
│  └─ src/
│     ├─ server.js
│     ├─ app.js
│     ├─ config/
│     │  └─ db.js
│     ├─ routes/
│     │  ├─ index.js
│     │  └─ generationRoutes.js
│     ├─ controllers/
│     │  └─ generationController.js
│     ├─ services/
│     │  ├─ aiService.js
│     │  └─ generationService.js
│     ├─ models/
│     │  ├─ generationModel.js
│     │  └─ languageModel.js
│     └─ middleware/
│        ├─ errorHandler.js
│        └─ notFoundHandler.js
│
└─ frontend/
   ├─ package.json
   ├─ .env.local.example
   ├─ next.config.mjs
   ├─ postcss.config.mjs
   ├─ tailwind.config.mjs
   ├─ jsconfig.json
   └─ app/
      ├─ layout.js
      ├─ globals.css
      ├─ page.js
      └─ components/
         ├─ PromptForm.jsx
         ├─ LanguageSelect.jsx
         ├─ CodeResult.jsx
         ├─ HistoryList.jsx
         ├─ Pagination.jsx
         ├─ LoadingSpinner.jsx
         └─ ErrorAlert.jsx
```


```
PORT=8080
NODE_ENV=development

# PostgreSQL (Neon example)
DATABASE_URL=postgresql://USER:PASSWORD@HOST/neondb?sslmode=require&channel_binding=require

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

#### NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

```
Table users {
  id int [pk, increment]
  email varchar(255) [unique]
  name varchar(255)
  created_at timestamptz
}

Table languages {
  id int [pk, increment]
  name varchar(100)
  code varchar(50) [unique] -- python, javascript, cpp
  created_at timestamptz
}

Table generations {
  id int [pk, increment]
  prompt text
  language varchar(100)
  code text
  language_id int [ref: > languages.id]
  user_id int [ref: > users.id]
  created_at timestamptz
}

```
# npm install
#### (Optional) Run SQL migration via psql if available: 
#### npm run migrate

### migrations/001_init.sql npm run dev 
### Server runs on http://localhost:8080
# API Endpoints
```

{
  "prompt": "Write a Python function to reverse a string",
  "language": "python"
}
Example Response
{
  "id": 1,
  "prompt": "Write a Python function to reverse a string",
  "language": "python",
  "code": "def reverse_string(s):\n    return s[::-1]\n",
  "createdAt": "2025-11-23T..."
}
```

## LINK to video
Live Demo: https://your-frontend-url.vercel.app |
Backend API: https://your-backend.onrender.com/api  |
Demo Video: https://youtu.be/xxxxxx |