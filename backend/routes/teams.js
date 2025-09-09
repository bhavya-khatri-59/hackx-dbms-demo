import express from 'express';
import {
  createTeam,
  addParticipant,
  getAllTeams,
  updateTeam,
  getTeamWithMembers,
  getParticipantByEmail
} from '../db_operations.js'; // Adjust path if necessary

const router = express.Router();

// Create a new team
router.post('/', async (req, res) => {
  try {
    const { teamName } = req.body;
    if (!teamName) {
      return res.status(400).json({ error: 'teamName is required' });
    }
    const newTeam = await createTeam(teamName);
    res.status(201).json(newTeam);
  } catch (err) {
    // Handle potential unique constraint violation for team name
    if (err.code === '23505') {
        return res.status(409).json({ error: 'A team with this name already exists.' });
    }
    res.status(500).json({ error: 'Failed to create team', details: err.message });
  }
});

// Join a team by its 5-character code
router.post('/join', async (req, res) => {
  try {
    const { teamId, participant } = req.body; // participant: { name, email, college, regno }
    if (!teamId || !participant || !participant.email) {
      return res.status(400).json({ error: 'teamId and participant details (including email) are required' });
    }

    // 1. Check if the team exists
    const team = await getTeamWithMembers(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // 2. Check if the participant is already in a team
    const existingParticipant = await getParticipantByEmail(participant.email);
    if (existingParticipant) {
      return res.status(409).json({ error: 'This user is already registered in a team.' });
    }

    // 3. Add the participant to the team
    await addParticipant({ ...participant, teamId });
    
    // 4. Get the updated team with the new member list
    const updatedTeam = await getTeamWithMembers(teamId);
    res.json(updatedTeam);

  } catch (err) {
    res.status(500).json({ error: 'Failed to join team', details: err.message });
  }
});

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve teams', details: err.message });
  }
});

// Update a team's name
router.put('/:id', async (req, res) => {
  try {
    const { id: teamId } = req.params;
    const { teamName } = req.body;
    if (!teamName) {
        return res.status(400).json({ error: 'teamName is required' });
    }
    const updatedTeam = await updateTeam(teamId, teamName);
    if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
    }
    res.json(updatedTeam);
  } catch (err) {
     if (err.code === '23505') {
        return res.status(409).json({ error: 'A team with this name already exists.' });
    }
    res.status(500).json({ error: 'Failed to update team', details: err.message });
  }
});

export default router;
