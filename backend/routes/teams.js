import express from 'express';
import {
  createTeamAndAddCreator,
  addParticipantToTeam,
  getParticipantByEmail,
  getAllTeams,
  updateTeam,
  getTeamById,
  removeParticipantFromTeam,
} from '../db_operations.js';

const router = express.Router();

// Create a new team
router.post('/', async (req, res) => {
  try {
    // FIX: Changed to destructure 'name' and 'email' to match what the frontend sends.
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Team name and creator email are required' });
    }
    // FIX: Pass both the team name and the creator's email to the database function.
    const newTeam = await createTeamAndAddCreator(name, email);
    res.status(201).json(newTeam);
  } catch (err) {
    if (err.code === '23505') {
        return res.status(409).json({ error: 'A team with this name already exists.' });
    }
    res.status(500).json({ error: 'Failed to create team', details: err.message });
  }
});

// Join a team
router.post('/join', async (req, res) => {
  try {
    const { email, teamId } = req.body;

    if (!email || !teamId) {
      return res.status(400).json({ error: 'Email and teamId are required.' });
    }

    const participant = await getParticipantByEmail(email);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found. Please complete registration first.' });
    }

    if (participant.teamid) {
      return res.status(400).json({ error: 'You are already in a team' });
    }
    
    const team = await getTeamById(teamId.toUpperCase());
    if (!team) {
        return res.status(404).json({ error: 'Team with the provided code not found.'});
    }

    if (team.members && team.members.length >= 4) {
      return res.status(400).json({ error: 'This team is full and cannot accept new members.' });
    }

    // Add the participant to the team
    await addParticipantToTeam(email, teamId.toUpperCase());
    
    // Return the full, updated team data
    const updatedTeam = await getTeamById(teamId.toUpperCase());
    res.json(updatedTeam);

  } catch (error) {
    console.error('Error joining team:', error);
    res.status(500).json({ error: 'Failed to join team' });
  }
});

// Get a single team by ID (including members)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
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


export default router;

