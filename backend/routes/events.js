import express from 'express';
import { getCurrentEvent } from '../db_operations.js';

const router = express.Router();

// GET the current event
router.get('/current', async (req, res) => {
  try {
    const event = await getCurrentEvent();
    if (!event) {
      // If no event is set in the DB, default to the first one.
      return res.json({ currentID: 1 });
    }
    res.json(event);
  } catch (err) {
    console.error('Error fetching current event:', err);
    res.status(500).json({ error: 'Failed to retrieve current event data' });
  }
});

export default router;
