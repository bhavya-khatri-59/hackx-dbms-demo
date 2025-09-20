import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import API routers
import teamsRouter from './routes/teams.js';
import submissionsRouter from './routes/submissions.js';
import participantsRouter from './routes/participants.js';
import eventsRouter from './routes/events.js';
import submissionsRound1Router from './routes/submissionsRound1.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5001; // Use 5001 to avoid conflict with frontend dev server

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) to allow your frontend to communicate with this backend
app.use(cors());
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());


// --- API Routes ---
// All routes for teams will be prefixed with /api/teams
app.use('/api/teams', teamsRouter);
// All routes for submissions will be prefixed with /api/submissions
app.use('/api/submissions', submissionsRouter);
// All routes for participants will be prefixed with /api/participants
app.use('/api/participants', participantsRouter);
// All routes for events will be prefixed with /api/events
app.use('/api/events', eventsRouter);
// All routes for Round 1 submissions will be prefixed with /api/submissions_round1
app.use('/api/submissions_round1', submissionsRound1Router);


// --- Server Initialization ---
// A simple health-check route to confirm the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Hackathon backend server is running!' });
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
