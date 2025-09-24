# HackXpertise 2.0
HackXpertise 2.0 is a two-day hackathon where participants brainstorm, design, and build innovative projects. It’s a platform for students to showcase their technical skills, collaborate in teams, and solve real-world problems using technology.

## Tech Stack
- React 18 - Modern React with hooks
- Tailwind CSS - Utility-first CSS framework
- Framer Motion - React animation library for UI elements
- GSAP - Professional animation library for background effects
- React Router - Client-side routing
- Lucide React - Beautiful icon library

## Getting Started
### 1. Install dependencies
```bash
npm install
npm install gsap
npm install three postprocessing
```

### Start the development server:
```bash
npm run dev
```

Open http://localhost:5173 in your browser


## Building for Production
```bash
npm run build
```
The built files will be in the dist/ directory, ready for deployment.



## Backend Setup
This project requires a Node.js and PostgreSQL backend to be running locally for full functionality.

### 1. Environment Variables
You need to create two separate .env files.

**A) Frontend .env File**  
Create a file named .env in the project's root directory (/hackx/.env) for your Google Client ID.
```
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

**B) Backend .env File**  
Create a file named .env inside the /backend directory (/hackx/backend/.env) for your database credentials.
```
# PostgreSQL Connection Details
DB_USER=myuser
DB_HOST=localhost
DB_DATABASE=event_db
DB_PASSWORD=mypassword
DB_PORT=5432

# Server Port
PORT=5001
```

### 2. Database Schema (PostgreSQL)
```sql
CREATE TABLE "teams" (
    "teamid" CHAR(5) PRIMARY KEY,
    "teamname" VARCHAR(255) NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "participant" (
    "email" VARCHAR(255) PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "college" VARCHAR(255) NOT NULL,
    "regno" VARCHAR(255) NOT NULL UNIQUE,
    "teamid" CHAR(5),
    FOREIGN KEY ("teamid") REFERENCES "teams"("teamid") ON DELETE SET NULL
);

CREATE TABLE "submissions" (
    "submissionid" SERIAL PRIMARY KEY,
    "description" TEXT,
    "githuburl" VARCHAR(255),
    "figmaurl" VARCHAR(255),
    "ppturl" VARCHAR(255),
    "teamid" CHAR(5) UNIQUE,
    FOREIGN KEY ("teamid") REFERENCES "teams"("teamid") ON DELETE CASCADE
);
```

### 3. Backend Installation and Setup
Follow these steps to get the backend server and database running.

**Step 1: Install Backend Dependencies**
```bash
cd backend
npm install
```

**Step 2: Set Up PostgreSQL Database**
Make sure you have PostgreSQL installed and the service is running.

Connect to PostgreSQL using psql and create the user and database.
```bash
psql -U postgres
```

Run the following SQL commands:
```sql
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE event_db;
GRANT ALL PRIVILEGES ON DATABASE event_db TO myuser;
\c event_db
GRANT ALL ON SCHEMA public TO myuser;
```

While still connected to event_db, run the CREATE TABLE statements from the Database Schema section above.

**Step 3: Run the Backend Server**
```bash
# Make sure you are in the /backend directory
npm run dev
```
Your backend API will now be running on http://localhost:5001. The frontend development server is pre-configured to proxy API requests to this address.
