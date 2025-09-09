import express from 'express';
import {
  createSubmission,
  getSubmissionByTeamId,
  updateSubmission,
  getTeamWithMembers
} from '../db_operations.js'; // Adjust the path if necessary

const router = express.Router();

// Create a new submission
router.post('/', async (req, res) => {
  try {
    const { description, githubURL, videoURL, teamId } = req.body;

    // Basic validation
    if (!description || !teamId) {
      return res.status(400).json({ error: 'description and teamId are required' });
    }

    // Check if the team exists before creating a submission
    const team = await getTeamWithMembers(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const newSubmission = await createSubmission({ description, githubURL, videoURL, teamId });
    res.status(201).json(newSubmission);
  } catch (err) {
    // Handle the unique constraint error if a submission for this team already exists
    if (err.code === '23505') {
      return res.status(409).json({ error: 'A submission for this team already exists.' });
    }
    res.status(500).json({ error: 'Failed to create submission', details: err.message });
  }
});

// Get a submission by team ID
router.get('/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const submission = await getSubmissionByTeamId(teamId);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found for this team' });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve submission', details: err.message });
  }
});

// Update a submission by team ID
router.put('/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const { description, githubURL, videoURL } = req.body;

    if (!description && !githubURL && !videoURL) {
        return res.status(400).json({ error: 'At least one field to update is required.' });
    }

    const updatedSubmission = await updateSubmission(teamId, { description, githubURL, videoURL });
    if (!updatedSubmission) {
      return res.status(404).json({ error: 'Submission not found for this team' });
    }
    res.json(updatedSubmission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update submission', details: err.message });
  }
});

export default router;
