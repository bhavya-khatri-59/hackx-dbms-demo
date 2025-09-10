import express from 'express';
import {
  createTeam,
  addParticipantToTeam,
  getParticipantByEmail,
  getAllTeams,
  updateTeam,
  getTeamById,
  createTeamAndAddCreator,
  removeParticipantFromTeam,
} from '../db_operations.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { teamName, email } = req.body;
    if (!teamName || !email) {
      return res.status(400).json({ error: 'teamName and email are required' });
    }
    // This new function handles creating the team AND adding the creator
    const newTeamWithMember = await createTeamAndAddCreator(teamName, email);
    res.status(201).json(newTeamWithMember);
  } catch (err) {
    if (err.code === '23505') { // Handle unique constraint violation for team name
        return res.status(409).json({ error: 'A team with this name already exists.' });
    }
    res.status(500).json({ error: 'Failed to create team', details: err.message });
  }
});

// Join a team
router.post('/join', async (req, res) => {
  try {
    const { email, teamId } = req.body;

    // Validate input
    if (!email || !teamId) {
      return res.status(400).json({ error: 'Email and teamId are required.' });
    }

    // Check if the participant exists
    const participant = await getParticipantByEmail(email);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found. Please complete registration first.' });
    }

    // Check if the participant is already in a team
    if (participant.teamid) {
      return res.status(400).json({ error: 'You are already in a team' });
    }
    
    // Check if the team exists
    const team = await getTeamById(teamId.toUpperCase());
    if (!team) {
        return res.status(404).json({ error: 'Team with the provided code not found.'});
    }

    const updatedParticipant = await addParticipantToTeam(email, teamId.toUpperCase());
    res.json(updatedParticipant);
  } catch (error) {
    console.error('Error joining team:', error);
    res.status(500).json({ error: 'Failed to join team' });
  }
});

// Leave a team
router.post('/leave', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Check if the participant exists
    const participant = await getParticipantByEmail(email);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found.' });
    }

    if (!participant.teamid) {
        return res.status(400).json({ error: 'You are not in a team.' });
    }
    
    await removeParticipantFromTeam(email);

    res.status(200).json({ message: 'Successfully left the team.' });
  } catch (error) {
    console.error('Error leaving team:', error);
    res.status(500).json({ error: 'Failed to leave team' });
  }
});

// Get a single team by ID (including members)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // The teamId is case-insensitive for user-friendliness in URLs
    const team = await getTeamById(id.toUpperCase());

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    console.error(`Error fetching team ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to retrieve team data' });
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

