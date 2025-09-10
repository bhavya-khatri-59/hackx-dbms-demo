import express from 'express';
import { createOrUpdateParticipant } from '../db_operations.js'; // Adjust path if necessary

const router = express.Router();

// Create or update a participant profile
router.post('/', async (req, res) => {
  try {
    const { name, email, college, regno } = req.body;
    if (!name || !email || !college || !regno) {
      return res.status(400).json({ error: 'All fields (name, email, college, regno) are required.' });
    }
    
    const participantData = { name, email, college, regno };
    const participant = await createOrUpdateParticipant(participantData);
    
    res.status(201).json(participant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save participant data', details: err.message });
  }
});

export default router;
