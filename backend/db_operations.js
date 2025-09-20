// Import the Pool class from the 'pg' library.
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const { Pool } = pg;

// --- Database Configuration for Connection Pooling ---
// This configuration now points to the Supabase connection pooler.
// The `ssl` option is important for secure connections to cloud databases.
const pool = new Pool({
  user: process.env.SUPABASE_USER_L,
  host: process.env.SUPABASE_HOST_L,
  database: process.env.SUPABASE_DATABASE_L,
  password: process.env.SUPABASE_PASSWORD_L,
  port: process.env.SUPABASE_PORT_L,
  ssl: {
    rejectUnauthorized: false // Required for some cloud providers, but consider more secure options for production
  },
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
    const res = await pool.query('SELECT "teamid" FROM "teams" WHERE "teamid" = $1', [teamCode]);
    if (res.rowCount === 0) {
      isUnique = true;
    }
  }
  return teamCode;
}

/**
 * Creates a new participant or updates their details if they already exist based on email.
 */
export async function createOrUpdateParticipant({ name, email, college, regno, phoneno }) {
  try {
    const query = `
      INSERT INTO "participant" ("name", "email", "college", "regno", "phoneno") 
      VALUES ($1, $2, $3, $4, $5) 
      ON CONFLICT ("email") 
      DO UPDATE SET 
        "name" = EXCLUDED."name", 
        "college" = EXCLUDED."college", 
        "regno" = EXCLUDED."regno",
        "phoneno" = EXCLUDED."phoneno"
      RETURNING *;
    `;
    const result = await pool.query(query, [name, email, college, regno, phoneno]);
    console.log(`Participant ${name} (${email}) created or updated.`);
    return result.rows[0];
  } catch (error) {
    console.error('Error in createOrUpdateParticipant:', error);
    throw error;
  }
}


// --- Team Operations ---

/**
 * Creates a new team and assigns the creator as the first member in a single transaction.
 */
export async function createTeamAndAddCreator(teamName, creatorEmail) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    const teamCode = await generateUniqueTeamCode();
    const newTeamRes = await client.query(
      'INSERT INTO "teams" ("teamid", "teamname") VALUES ($1, $2) RETURNING "teamid"',
      [teamCode, teamName]
    );
    const newTeamId = newTeamRes.rows[0].teamid;

    await client.query(
      'UPDATE "participant" SET "teamid" = $1 WHERE "email" = $2',
      [newTeamId, creatorEmail]
    );

    await client.query('COMMIT'); // Commit transaction

    return getTeamById(newTeamId);

  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error('Error in createTeamAndAddCreator transaction:', error);
    throw error;
  } finally {
    client.release(); // Release client back to the pool
  }
}

/**
 * Removes a participant from any team by setting their teamid to NULL.
 */
export async function removeParticipantFromTeam(email) {
  try {
    const result = await pool.query(
      'UPDATE "participant" SET "teamid" = NULL WHERE "email" = $1 RETURNING *',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error removing participant from team:', error);
    throw error;
  }
}

/**
 * Retrieves all teams from the database.
 */
export async function getAllTeams() {
  try {
    const result = await pool.query('SELECT * FROM "teams"');
    return result.rows;
  } catch (error) {
    console.error('Error getting all teams:', error);
    throw error;
  }
}

/**
 * Updates a team's name.
 */
export async function updateTeam(teamId, newName) {
    try {
        const result = await pool.query(
            'UPDATE "teams" SET "teamname" = $1 WHERE "teamid" = $2 RETURNING *',
            [newName, teamId]
        );
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Error updating team:', error);
        throw error;
    }
}


// --- Participant Operations ---

/**
 * Adds a participant to a team by updating their teamid.
 */
export async function addParticipantToTeam(email, teamId) {
    try {
        const result = await pool.query(
            'UPDATE "participant" SET "teamid" = $1 WHERE "email" = $2 RETURNING *',
            [teamId, email]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error adding participant to team:', error);
        throw error;
    }
}

/**
 * Retrieves a participant by their email.
 */
export async function getParticipantByEmail(email) {
    try {
        const result = await pool.query('SELECT * FROM "participant" WHERE "email" = $1', [email]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error getting participant by email:', error);
        throw error;
    }
}

/**
 * Retrieves a single team by its ID, including its members.
 */
export async function getTeamById(teamId) { 
  try {
    const teamResult = await pool.query('SELECT * FROM "teams" WHERE "teamid" = $1', [teamId]);
    if (teamResult.rowCount === 0) {
      return null;
    }
    const membersResult = await pool.query('SELECT "name", "email" FROM "participant" WHERE "teamid" = $1', [teamId]);
    const team = teamResult.rows[0];
    
    const formattedTeam = {
        code: team.teamid,
        name: team.teamname,
        created_at: team.created_at, // Pass this through
        members: membersResult.rows
    };

    return formattedTeam;
  } catch (error) {
    console.error('Error getting team by ID:', error);
    throw error;
  }
}


// --- Submission Operations ---

/**
 * Creates a new project submission for a team.
 */
export async function createSubmission({ description, githubURL, figmaURL, pptURL, teamId }) {
  try {
    const newSubmission = await pool.query(
      'INSERT INTO "submissions" ("description", "githuburl", "figmaurl", "ppturl", "teamid") VALUES ($1, $2, $3, $4, $5) RETURNING *',
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
 */
export async function getSubmissionByTeamId(teamId) {
  try {
    const result = await pool.query('SELECT * FROM "submissions" WHERE "teamid" = $1', [teamId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting submission:', error);
    throw error;
  }
}

/**
 * Updates an existing project submission.
 */
export async function updateSubmission(teamId, { description, githubURL, figmaURL, pptURL }) {
  try {
    const result = await pool.query(
      `UPDATE "submissions" 
       SET 
         "description" = COALESCE($1, "description"), 
         "githuburl" = COALESCE($2, "githuburl"), 
         "figmaurl" = COALESCE($3, "figmaurl"),
         "ppturl" = COALESCE($4, "ppturl")
       WHERE "teamid" = $5 
       RETURNING *`,
      [description, githubURL, figmaURL, pptURL, teamId]
    );
    
    if (result.rowCount === 0) return null;

    console.log(`Submission updated for team ${teamId}`);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating submission:', error);
    throw error;
  }
}

