import express from 'express';
import { createOrUpdateParticipant, getParticipantByEmail } from '../db_operations.js'; // Adjust path if necessary

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

// Get a participant by email
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const participant = await getParticipantByEmail(email);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    res.json(participant);
  } catch (error) {
    console.error('Error fetching participant by email:', error);
    res.status(500).json({ error: 'Failed to retrieve participant data' });
  }
});

export default router;
