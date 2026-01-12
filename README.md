# CampusConnect

A Full-Stack Campus Placement and Community Platform

CampusConnect is a production-ready campus placement and student community platform designed to streamline interactions between students, placement cell administrators, and peers within a single unified system.

Unlike traditional job boards, CampusConnect integrates job postings, application tracking, dashboards, and interview preparation into one cohesive platform.

---

## Overview

CampusConnect supports real-world campus placement workflows by providing clear visibility into student applications, administrative control for placement cells, and a collaborative space for interview preparation and peer learning.

The platform emphasizes secure access control, scalable architecture, and a user experience designed for safety and clarity.

---

## Core Features

### Authentication and Authorization

* Secure signup, login, and logout
* JWT-based authentication using HTTP-only cookies
* Role-based access control:

  * Student
  * Admin (Placement Cell)
* Protected routes and admin-only access

---

## Student Features

### Student Dashboard

* Centralized overview of the placement journey
* Application insights by status:

  * Applied
  * Shortlisted
  * Rejected
  * Offered
* Responsive layout optimized for desktop and mobile

---

### Jobs

* View all active job listings
* Job status indicators (Open / Closed)
* Apply to jobs with external application intent tracking
* Prevention of duplicate applications
* Confirmation before submitting applications

---

### My Applications

* View all submitted applications
* Withdraw applications with confirmation
* Responsive interface:

  * Table view on desktop
  * Card-based layout on mobile

**Note:**
Withdrawing an application only removes it from CampusConnect. External company applications cannot be cancelled.

---

## Admin Features

### Job Management

* Create, edit, and delete job postings
* Open and close job applications
* View applicants per job

---

### Admin Dashboard

* Overview of total jobs
* Open vs closed job statistics
* Total applications count
* Most applied jobs
* Secure admin-only access

---

### Applicant Management

* View applicants for each job
* Track and update application statuses

---

## Interview Preparation Module

A community-driven module that allows students to share interview-related knowledge and experiences.

### Post Creation

* Interview experiences
* Interview questions
* Tips and preparation strategies

---

### Content Discovery

* Search by:

  * Title
  * Content
  * Company
  * Role
  * Tags
* Filter by:

  * Post type (Experience, Questions, Tips)
  * Company
  * Role

---

### Engagement

* Upvote posts
* Clickable tags for instant filtering
* Fully responsive user interface

---

## Technology Stack

### Frontend

* React with TypeScript
* Redux Toolkit
* Tailwind CSS
* Framer Motion
* React Router
* Lucide Icons
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT authentication (HTTP-only cookies)
* Role-based middleware

---

## Project Structure

The project is organized as a monorepo with a clear separation between frontend and backend, following scalable and maintainable conventions.

```bash
CampusConnect/
├── backend/
│   ├── controllers/
│   │   └── resume.controller.js
│   ├── lib/
│   │   └── utils.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── models/
│   │   ├── interviewPrep.model.js
│   │   ├── job.model.js
│   │   ├── jobApplication.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── application.routes.js
│   │   ├── auth.routes.js
│   │   ├── interviewPrep.routes.js
│   │   ├── job.routes.js
│   │   └── resume.routes.js
│   ├── utils/
│   │   └── db.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   ├── interviewPrep/
│   │   │   ├── jobs/
│   │   │   ├── resume/
│   │   │   └── AuthLoader.tsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── InterviewPrep.tsx
│   │   │   ├── Jobs.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── MyApplications.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── ResumeAnalyzer.tsx
│   │   │   └── Signup.tsx
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── PublicRoute.tsx
│   │   │   └── StudentRoute.tsx
│   │   ├── store/
│   │   │   ├── adminSlice.ts
│   │   │   ├── applicationsSlice.ts
│   │   │   ├── authSlice.ts
│   │   │   ├── interviewPrepSlice.ts
│   │   │   └── jobsSlice.ts
│   │   ├── hooks.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── eslint.config.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Architectural Notes

* Backend follows a controller–route–model pattern
* Frontend uses feature-based component organization
* Redux Toolkit is used for predictable state management
* Role-based access is enforced at both routing and API levels
* Designed for scalability and real-world deployment

---

## Route Access Control

| Route              | Student | Admin |
| ------------------ | ------- | ----- |
| `/dashboard`       | Yes     | No    |
| `/applications`    | Yes     | No    |
| `/jobs`            | Yes     | Yes   |
| `/admin/dashboard` | No      | Yes   |
| `/interview-prep`  | Yes     | Yes   |

---

## UX and Design Decisions

* Confirmation modals for destructive actions
* Withdrawals intentionally restricted from the dashboard
* External applications tracked as intent rather than direct submission
* Mobile-first responsive layouts
* Role-based navigation menus

---

## Roadmap

* Comments on interview preparation posts
* Bookmarks and saved posts
* Markdown editor for content creation
* Notifications
* Advanced analytics and reporting
* CSV export for administrators
* Content moderation and reporting tools

---

## Local Development Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
```

---

## Final Notes

CampusConnect is built with real-world campus placement workflows in mind, focusing on:

* Safety-oriented user experience
* Scalable and maintainable architecture
* Clear separation of concerns
* Production-ready implementation patterns

This project is intended as a strong foundation for a real campus placement platform rather than a simple demonstration.

---

If you find this project useful, feel free to star the repository, fork it, or build on top of it.
