import express from 'express';
import Team from '../models/Team.js';

const router = express.Router();


// Helper to generate a random code
function generateCode(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
}

// Create a new team with unique code
router.post('/', async (req, res) => {
  try {
    const { name, members = [] } = req.body;
    let code;
    let exists = true;
    while (exists) {
      code = generateCode();
      exists = await Team.findOne({ code });
    }
    const team = new Team({ name, code, members });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Join team by code
router.post('/join', async (req, res) => {
  try {
    const { code, member } = req.body; // member: { name, email }
    const team = await Team.findOne({ code });
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    // Prevent duplicate members by email
    if (team.members.some(m => m.email === member.email)) {
      return res.status(400).json({ error: 'Member already in team' });
    }
    team.members.push(member);
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a team
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
