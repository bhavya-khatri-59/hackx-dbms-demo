import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import teamsRouter from './routes/teams.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Teams API routes
app.use('/api/teams', teamsRouter);

// MongoDB connection
mongoose.connect('mongodb+srv://lakshyaranu_db_user:VsGynbWPpc1EuUC4@cluster0.qfzpgdo.mongodb.net/hackxpertise?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch((err) => console.error('MongoDB Atlas connection error:', err));

// Sample API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
