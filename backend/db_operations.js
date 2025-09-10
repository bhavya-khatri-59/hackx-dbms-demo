// Import the Pool class from the 'pg' library.
// A connection pool is a standard way to manage database connections for better performance.
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const { Pool } = pg;

// --- Database Configuration ---
// The Pool now securely uses environment variables.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// --- Helper function to generate a unique 5-character team code ---
async function generateUniqueTeamCode() {
  let teamCode;
  let isUnique = false;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  while (!isUnique) {
    teamCode = '';
    for (let i = 0; i < 5; i++) {
      teamCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // Check if this code already exists in the database
    const res = await pool.query('SELECT "TeamID" FROM "Teams" WHERE "TeamID" = $1', [teamCode]);
    if (res.rowCount === 0) {
      isUnique = true;
    }
  }
  return teamCode;
}


// --- Team Operations ---

/**
 * Creates a new team with a unique, automatically generated code.
 * @param {string} teamName - The desired name for the team.
 * @returns {Promise<object>} The newly created team object.
 */
export async function createTeam(teamName) {
  try {
    const teamCode = await generateUniqueTeamCode();
    const newTeam = await pool.query(
      'INSERT INTO "Teams" ("TeamID", "TeamName") VALUES ($1, $2) RETURNING *',
      [teamCode, teamName]
    );
    console.log(`Team created with code: ${teamCode}`);
    return newTeam.rows[0];
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
}

/**
 * Retrieves all teams from the database.
 * @returns {Promise<Array>} An array of all team objects.
 */
export async function getAllTeams() {
  try {
    const result = await pool.query('SELECT * FROM "Teams"');
    return result.rows;
  } catch (error) {
    console.error('Error getting all teams:', error);
    throw error;
  }
}

/**
 * Updates a team's name.
 * @param {string} teamId - The ID of the team to update.
 * @param {string} newName - The new name for the team.
 * @returns {Promise<object|null>} The updated team object, or null if not found.
 */
export async function updateTeam(teamId, newName) {
    try {
        const result = await pool.query(
            'UPDATE "Teams" SET "TeamName" = $1 WHERE "TeamID" = $2 RETURNING *',
            [newName, teamId]
        );
        if (result.rowCount === 0) {
            return null; // No team found to update
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error updating team:', error);
        throw error;
    }
}


// --- Participant Operations ---

/**
 * Retrieves a participant by their email to check if they already exist.
 * @param {string} email - The email of the participant to find.
 * @returns {Promise<object|null>} The participant object, or null if not found.
 */
export async function getParticipantByEmail(email) {
    try {
        const result = await pool.query('SELECT * FROM "Participant" WHERE "Email" = $1', [email]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error getting participant by email:', error);
        throw error;
    }
}

/**
 * Adds a participant to a specific team.
 * @param {object} participantDetails - An object containing participant info.
 * @param {string} participantDetails.name - Participant's full name.
 * @param {string} participantDetails.email - Participant's email (Primary Key).
 * @param {string} participantDetails.college - Participant's college.
 * @param {string} participantDetails.regno - Participant's registration number.
 * @param {string} participantDetails.teamId - The 5-character ID of the team to join.
 * @returns {Promise<object>} The newly added participant object.
 */
export async function addParticipant({ name, email, college, regno, teamId }) {
  try {
    const newParticipant = await pool.query(
      'INSERT INTO "Participant" ("Name", "Email", "College", "Regno", "TeamID") VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, college, regno, teamId]
    );
    console.log(`Participant ${name} added to team ${teamId}`);
    return newParticipant.rows[0];
  } catch (error) {
    console.error('Error adding participant:', error);
    throw error;
  }
}

/**
 * Retrieves a team and all of its members.
 * @param {string} teamId - The 5-character ID of the team.
 * @returns {Promise<object|null>} The team object with a 'members' array, or null if not found.
 */
export async function getTeamWithMembers(teamId) {
  try {
    const teamRes = await pool.query('SELECT * FROM "Teams" WHERE "TeamID" = $1', [teamId]);
    if (teamRes.rowCount === 0) {
      return null; // Team not found
    }
    const team = teamRes.rows[0];
    const membersRes = await pool.query('SELECT "Name", "Email" FROM "Participant" WHERE "TeamID" = $1', [teamId]);
    team.members = membersRes.rows;
    return team;
  } catch (error) {
    console.error('Error getting team with members:', error);
    throw error;
  }
}

// --- Submission Operations ---

/**
 * Creates a new project submission for a team.
 * @param {object} submissionDetails - An object containing submission info.
 * @param {string} submissionDetails.description - The project description.
 * @param {string} [submissionDetails.githubURL] - The project's GitHub link.
 * @param {string} [submissionDetails.figmaURL] - The project's Figma link.
 * @param {string} [submissionDetails.pptURL] - The project's presentation link.
 * @param {string} submissionDetails.teamId - The 5-character ID of the submitting team.
 * @returns {Promise<object>} The newly created submission object.
 */
export async function createSubmission({ description, githubURL, figmaURL, pptURL, teamId }) {
  try {
    const newSubmission = await pool.query(
      'INSERT INTO "Submissions" ("Description", "GitHubURL", "FigmaURL", "PPTURL", "TeamID") VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [description, githubURL, figmaURL, pptURL, teamId]
    );
    console.log(`Submission created for team ${teamId}`);
    return newSubmission.rows[0];
  } catch (error) {
    console.error('Error creating submission:', error);
    throw error;
  }
}

/**
 * Retrieves a submission by the team's ID.
 * @param {string} teamId - The 5-character ID of the team.
 * @returns {Promise<object|null>} The submission object, or null if not found.
 */
export async function getSubmissionByTeamId(teamId) {
  try {
    const result = await pool.query('SELECT * FROM "Submissions" WHERE "TeamID" = $1', [teamId]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error getting submission:', error);
    throw error;
  }
}

/**
 * Updates an existing project submission.
 * @param {string} teamId - The 5-character ID of the team whose submission is being updated.
 * @param {object} updates - An object containing the fields to update.
 * @param {string} [updates.description] - The updated project description.
 * @param {string} [updates.githubURL] - The updated GitHub link.
 * @param {string} [updates.figmaURL] - The updated Figma link.
 * @param {string} [updates.pptURL] - The updated presentation link.
 * @returns {Promise<object|null>} The updated submission object, or null if not found.
 */
export async function updateSubmission(teamId, { description, githubURL, figmaURL, pptURL }) {
  try {
    const result = await pool.query(
      `UPDATE "Submissions" 
       SET 
         "Description" = COALESCE($1, "Description"), 
         "GitHubURL" = COALESCE($2, "GitHubURL"), 
         "FigmaURL" = COALESCE($3, "FigmaURL"),
         "PPTURL" = COALESCE($4, "PPTURL")
       WHERE "TeamID" = $5 
       RETURNING *`,
      [description, githubURL, figmaURL, pptURL, teamId]
    );
    
    if (result.rowCount === 0) {
      return null;
    }
    console.log(`Submission updated for team ${teamId}`);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating submission:', error);
    throw error;
  }
}

