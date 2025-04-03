# Software Requirements Specification - Wÿ Sommer Portfolio

## System Design
- Multi-page, full-screen immersive experience with interactive animations.
- Backend powered by **Node.js & Express**, with **Supabase** for authentication and database management.
- Frontend developed using **Next.js** for optimized performance and server-side rendering (SSR).

## Architecture Pattern
- **Client-Server Architecture** with Next.js handling frontend rendering and API calls.
- **Modular Design** separating UI components, API endpoints, and database interactions.
- **Server-Side Rendering (SSR) & Static Generation (SSG)** for improved SEO and performance.

## State Management
- **React Context API** for global state management.
- **Supabase Realtime** for real-time updates in job board listings.
- **Local Component State** for UI interactions and animations.

## Data Flow
1. **User interacts** with UI elements (Portfolio, Resume, Job Board, Contact Form).
2. **Frontend requests** data via API endpoints (e.g., fetching projects, retrieving job listings).
3. **Backend processes** requests via Express routes, fetching/updating data in Supabase.
4. **Response sent back** to the frontend, dynamically updating the UI.
5. **Supabase Realtime** pushes updates for job board and portfolio changes.

## Technical Stack
- **Frontend:** Next.js (React), Tailwind CSS, Framer Motion (for animations).
- **Backend:** Node.js with Express.
- **Database:** Supabase (PostgreSQL).
- **Authentication:** Supabase Auth (OAuth, Email/Password login).
- **Hosting & Deployment:** Vercel (Frontend), Supabase (Backend/DB).

## Authentication Process
- **Users (Employers) can sign up/login** via Supabase Auth.
- OAuth options available (Google, GitHub, etc.).
- **JWT tokens** for secure authentication and authorization.
- **Session-based authentication** with automatic refresh.
- Employers can only manage their own job postings after authentication.

## Route Design
### Public Routes
- `/` - Landing Page
- `/portfolio` - Project Showcase
- `/resume` - Interactive Resume
- `/job-board` - Job Listings View
- `/contact` - Contact Form & Calendly Embed

### Protected Routes (Require Authentication)
- `/job-board/post` - Post a Job (Employers only)
- `/job-board/manage` - Manage Job Listings

## API Design
- **GET /api/projects** → Fetch portfolio projects.
- **GET /api/job-board** → Fetch job listings.
- **POST /api/job-board** → Create a new job post (Authenticated Employers).
- **PUT /api/job-board/:id** → Edit a job post (Authenticated Employers).
- **DELETE /api/job-board/:id** → Remove a job post (Authenticated Employers).
- **POST /api/contact** → Submit contact form data.

## Database Design (ERD)
### **Users Table**
- `id` (UUID, Primary Key)
- `email` (Unique, String)
- `password_hash` (String)
- `role` (Enum: User, Employer)
- `created_at` (Timestamp)

### **Projects Table**
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (Text)
- `image_url` (String)
- `live_demo_url` (String)
- `github_url` (String)
- `created_at` (Timestamp)

### **Job Listings Table**
- `id` (UUID, Primary Key)
- `employer_id` (Foreign Key → Users.id)
- `title` (String)
- `description` (Text)
- `company_name` (String)
- `location` (String)
- `salary_range` (String)
- `created_at` (Timestamp)

This document serves as the foundation for developing the **Wÿ Sommer Portfolio**, ensuring a structured, scalable, and high-performance application.