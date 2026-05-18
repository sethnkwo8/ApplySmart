# 🚀 ApplySmart

ApplySmart is an AI-powered resume optimization platform designed to help job seekers tailor their CVs to specific job descriptions, improve ATS compatibility, and increase interview chances through intelligent resume analysis and optimization.

The platform analyzes uploaded resumes against job listings, identifies keyword gaps, evaluates ATS match quality, and provides AI-assisted improvements to help users create stronger applications.

---

## 🌐 Vision

Modern hiring systems rely heavily on Applicant Tracking Systems (ATS), making it difficult for qualified candidates to get noticed.

ApplySmart aims to bridge this gap by combining:
- AI-powered resume analysis
- ATS optimization
- Keyword matching
- Intelligent resume rewriting
- Job-specific recommendations

into a clean, modern SaaS-style experience.

---

## ✨ Current Features

- 🔐 Authentication System
  - Secure JWT authentication
  - Refresh-token based session persistence
  - HTTP-only cookie security
  - Zustand-powered frontend auth state
  - Email/password authentication
  - Google OAuth authentication
  - Automatic account linking for Google sign-ins
  - Multi-provider authentication architecture
  - Persistent sessions with automatic auth hydration

- 📄 Resume Input
  - Paste resume text directly
  - Resume upload UI support
  - Job description analysis input

- 🎯 ATS Optimization
  - Resume-to-job matching
  - Keyword gap analysis
  - ATS compatibility scoring
  - AI-assisted resume improvements *(in progress)*

- 🎨 Modern UX
  - Responsive UI
  - SaaS-style landing page
  - Animated loading states
  - Clean auth experience
  - Dark modern design system

---

## 🧠 Engineering Highlights

### Secure Authentication Architecture
ApplySmart uses a production-style authentication flow:
- Short-lived access tokens
- HTTP-only refresh token cookies
- Automatic session restoration
- Centralized Zustand auth state management
- Protected frontend architecture

This approach improves security by avoiding localStorage token storage while maintaining persistent login sessions.

---

### Multi-Provider Authentication
ApplySmart supports both traditional email/password authentication and Google OAuth sign-in.

The authentication system intelligently handles:
- local authentication
- Google OAuth login
- account linking by email
- provider-aware login validation
- JWT issuance across authentication providers

Users who initially register with email/password can later authenticate using Google with automatic account linking support.

---

### Frontend State Management
Authentication state is managed globally using Zustand:
- automatic auth hydration
- centralized login/logout handling
- token refresh handling
- loading synchronization across the app

---

### Decoupled Architecture
ApplySmart follows a fully decoupled architecture:
- Next.js frontend
- Express.js backend API
- Separate authentication layer
- AI optimization service integration

This structure improves scalability, maintainability, and deployment flexibility.

---

## 🧰 Tech Stack

| Category | Tools |
|----------|--------|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS |
| **UI/UX** | Lucide Icons, Sonner |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB |
| **Authentication** | JWT, HTTP-only cookies, Google OAuth |
| **State Management** | Zustand |
| **Validation** | Zod |
| **AI Integration** | OpenAI API *(planned)* |
| **Deployment** | Vercel / Render *(planned)* |

---

## 🏗 Architecture Overview

ApplySmart follows a modular full-stack architecture:

### Frontend
- App Router architecture
- reusable component system
- centralized auth store
- API abstraction layer
- protected route structure

### Backend
- controller/service architecture
- JWT authentication
- refresh token handling
- centralized error handling
- scalable route organization

---

## 🔐 Authentication Flow

1. User signs in with email/password or Google OAuth
2. Backend verifies credentials or Google ID token
3. Access token returned to frontend
4. Refresh token stored securely in HTTP-only cookie
5. Zustand hydrates auth state
6. Session restored automatically on refresh

---

## 📌 Planned Features

- 🤖 AI Resume Optimization
- 📊 ATS Match Scoring
- 📝 Resume Summary Rewriting
- 📄 PDF/DOCX Resume Parsing
- 🔍 Skill Gap Detection
- 💳 Payment Integration
- 👤 User Dashboard
- 📂 Resume History
- 🌍 Google OAuth
- 🐳 Docker Support
- ⚙️ CI/CD Pipeline

---

## ⚙️ Local Development Setup

### 1. Clone repository

```bash
git clone https://github.com/sethnkwo8/ApplySmart.git
```

### 2. Frontend setup

```bash
cd applysmart-web
npm install
npm run dev
```

### 3. Backend setup

```bash
cd applysmart-api
npm install
npm run dev
```

## 🌍 Environment Variables

**Frontend** .env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

**Backend** .env

```env
PORT=5000
MONGO_URI=your-mongo-uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

## 🧪 Current Status
ApplySmart is actively under development.

Current focus:

- AI resume optimization pipeline
- protected dashboard architecture
- file upload + parsing
- ATS scoring engine

---

## 📖 Lessons Learned

- Secure authentication architecture
- Refresh token handling
- Zustand state management
- Decoupled frontend/backend systems
- Production-style session persistence
- API abstraction patterns
- Modern SaaS UI architecture
- OAuth authentication flows
- Google ID token verification
- multi-provider account management
- secure cookie-based auth architecture

---

## 🛡 Security Considerations
ApplySmart implements several production-style security practices:

- HTTP-only refresh token cookies
- short-lived access tokens
- secure JWT verification
- provider-aware authentication validation
- centralized backend error handling
- protected session restoration flow
- password hashing with bcrypt
- secure Google ID token verification

---

## 📬 Contact

- Portfolio: https://seth-nkwo.vercel.app
- LinkedIn: https://www.linkedin.com/in/seth-nkwo/
- GitHub: https://github.com/sethnkwo8

---

## ⭐ Acknowledgements

ApplySmart is being built as a production-style full-stack SaaS application focused on solving real-world hiring and ATS optimization challenges while deepening expertise in software engineering, cloud architecture, and AI-powered applications

Special thanks to:

-  The teams behind Next.js, React, Tailwind CSS, Express.js, and MongoDB for providing the tools that power the application.
- OpenAI for enabling AI-powered resume optimization and ATS analysis features.
- Zustand for lightweight and scalable client-side state management.
- Shadcn UI and Lucide Icons for helping create a modern UI/UX experience.
- The developer community across GitHub, Stack Overflow, and MDN Web Docs for continuous learning and problem-solving resources.

This project continues to evolve as new features, cloud infrastructure improvements, DevOps practices, and AI capabilities are added.

