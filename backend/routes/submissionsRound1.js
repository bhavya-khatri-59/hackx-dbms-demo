import express from 'express';
import {
  createOrUpdateSubmissionRound1,
  getSubmissionRound1ByTeamId,
  getTeamById
} from '../db_operations.js';

const router = express.Router();

// Create or Update a Round 1 submission
router.post('/', async (req, res) => {
  try {
    const { problemStatement, pptTemplateURL, description, teamId } = req.body;

    if (!problemStatement || !pptTemplateURL || !teamId) {
      return res.status(400).json({ error: 'problemStatement, pptTemplateURL, and teamId are required' });
    }

    const team = await getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const submissionData = { problemStatement, pptTemplateURL, description, teamId };
    const newSubmission = await createOrUpdateSubmissionRound1(submissionData);
    
    res.status(201).json(newSubmission);
  } catch (err) {
    console.error('Error in Round 1 submission POST route:', err);
    res.status(500).json({ error: 'Failed to process Round 1 submission', details: err.message });
  }
});

// Get a Round 1 submission by team ID
router.get('/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const submission = await getSubmissionRound1ByTeamId(teamId);
    if (!submission) {
      return res.status(404).json({ error: 'Round 1 submission not found for this team' });
    }
    res.json(submission);
  } catch (err) {
    console.error('Error fetching Round 1 submission:', err);
    res.status(500).json({ error: 'Failed to retrieve Round 1 submission', details: err.message });
  }
});

export default router;
