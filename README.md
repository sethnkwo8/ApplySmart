# 🚀 ApplySmart

ApplySmart is an AI-powered resume optimization platform designed to help job seekers tailor their CVs to specific job descriptions, improve ATS compatibility, and increase interview chances through intelligent resume analysis and optimization.

The platform analyzes uploaded resumes against job listings, identifies keyword gaps, evaluates ATS match quality, and provides AI-assisted improvements to help users create stronger applications.

---

## 🌍 Live Frontend Preview

🚀 https://apply-smart-six.vercel.app

> Backend AI optimization pipeline is currently under active development.

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
  - Drag-and-drop resume uploads
  - PDF, DOCX, and TXT upload support
  - Toast-based upload feedback
  - Protected optimization workflow

- 🎯 ATS Optimization
  - Resume-to-job matching
  - Keyword gap analysis
  - ATS compatibility scoring
  - Resume parsing + extraction engine
  - PDF/DOCX/TXT text extraction pipeline
  - File validation + upload security middleware
  - Optimization history architecture
  - Skill classification + weighted matching system
  - AI-assisted resume improvements *(in progress)*

- 🎨 Modern UX
  - Responsive UI
  - SaaS-style landing page
  - Animated loading states
  - Clean auth experience
  - Dark modern design system
  - Interactive drag-and-drop upload UI
  - Protected tool access flow

---

## 🖼️ Project Screenshots

Below are key screenshots showcasing the main features of ApplySmart:

| Feature | Screenshot | Description |
|---------|------------|-------------|
| Landing Page | ![landing-page](screenshots/landing-page.png) | ApplySmart Landing Page (Logged in). |
| Landing Page 2 | ![landing-page](screenshots/landing-page-2.png) | ApplySmart Landing Page. |
| Optimization Tool | ![onboarding-1](screenshots/optimization-tool.png) | Main Optimization Tool. |
| Sign Up | ![register](screenshots/signup-page.png) | ApplySmart Sign Up Page. |
| Sign In | ![login](screenshots/sign-in-page.png) | ApplySmart Sign In Page. |

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

### Resume Upload Pipeline

ApplySmart includes a flexible resume ingestion system supporting:
- drag-and-drop uploads
- PDF/DOCX/TXT files
- direct resume text pasting
- upload state management
- protected optimization access flow

The upload architecture was designed to support future AI-powered parsing and resume analysis pipelines.

### ⚙️ Resume Parsing & Processing Pipeline

ApplySmart includes a backend resume ingestion pipeline engineered for scalable AI analysis workflows.

Supported File Types:
- PDF
- DOCX
- TXT

#### Pipeline Architecture
The upload system uses:

- Multer memory storage for in-memory processing
- MIME-type validation middleware
- file size protection limits
- centralized upload error handling
- asynchronous text extraction utilities

#### Parsing Stack

- pdf-parse for PDF extraction
- mammoth for DOCX extraction
- custom normalization utilities for text cleanup

The extraction pipeline also handles:

- malformed uploads
- unsupported MIME types
- empty or unreadable documents
- centralized validation responses

This architecture was designed to support future:

- AI resume rewriting
- ATS scoring
- semantic skill extraction
- optimization history tracking
- resume intelligence pipeline

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
| **Validation & Uploads** | Zod, Multer |
| **Document Processing** | pdf-parse, Mammoth |
| **AI Integration** | OpenAI API *(planned)* |
| **Deployment** | Vercel *(frontend deployed)* / Render *(planned)* |

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

## 👨🏿‍💻 Optimization Engine Architecture

ApplySmart introduces a modular optimization architecture designed around scalable resume intelligence workflows.

### Core Models
- `User`
- `Skill`
- `Optimization`

### Skill Intelligence System

The platform includes a categorized skill engine with:
- weighted importance scoring
- alias-based skill matching
- categorized industry skills
- recommendation generation
- learning resource mapping

### Optimization Tracking

Each optimization stores:
- uploaded resume metadata
- extracted raw resume text
- ATS score results
- job description context
- matched/missing skills
- generated optimization summaries

This structure enables:
- historical optimization tracking
- future analytics dashboards
- AI-assisted rewrite suggestions
- resume improvement insights

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
- 🧠 Semantic AI Skill Extraction
- ✍️ AI Resume Rewriting
- 📊 Resume Analytics Dashboard
- 🔍 Skill Gap Detection
- 💳 Payment Integration
- 👤 User Dashboard
- 📂 Resume History
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

- AI optimization engine integration
- semantic skill matching
- ATS scoring algorithms
- OpenAI-powered rewrite suggestions
- optimization dashboard architecture
- historical resume analytics

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
- file upload middleware architecture
- MIME-type validation strategies
- document parsing pipelines
- asynchronous controller handling
- centralized Express error architecture
- scalable MongoDB schema design
- optimization engine modeling

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
- MIME-type upload validation
- file size restriction enforcement
- centralized async error handling
- protected upload pipeline architecture
- in-memory upload processing

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

