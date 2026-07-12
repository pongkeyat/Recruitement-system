import pool from "../config/db.js";

export const postInterviewSession = async (req, res) => {
    // Destructure fields matching your React component payload
    const { vacancy_id, selectedApplicants, session_date, venue, panelists, remarks } = req.body;

    // 1. Validation
    if (!vacancy_id || !session_date || !venue || !panelists) {
        return res.status(400).json({ error: 'Vacancy ID, Session Date, Venue, and Panelists are required.' });
    }

    if (!Array.isArray(selectedApplicants) || selectedApplicants.length === 0) {
        return res.status(400).json({ error: 'At least one job applicant must be selected.' });
    }

    try {
        // Start a database transaction so either all rows save or none do
        await pool.query('BEGIN');

        const insertedSessions = [];

        // 2. Loop through each selected applicant ID and insert a row
        for (const job_applications_id of selectedApplicants) {
            const result = await pool.query(
                `INSERT INTO interview_sessions (
                    vacancy_id, 
                    job_applications_id, 
                    session_date, 
                    venue, 
                    conducted_by, 
                    remarks
                )
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [
                    vacancy_id, 
                    job_applications_id, 
                    session_date, 
                    venue, 
                    panelists, 
                    remarks || '' 
                ]
            );
            insertedSessions.push(result.rows[0]);
        }

        // Commit transaction if all loops succeeded
        await pool.query('COMMIT');

        // 3. Return the array of newly created database sessions
        return res.status(201).json({ 
            message: 'Assessment sessions successfully scheduled.',
            sessions: insertedSessions 
        });

    } 
    catch (error) {
        // Rollback transaction to prevent partial dirty records
        await pool.query('ROLLBACK');
        console.error('Error creating interview session entries:', error);

        if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid database reference constraint. Verify your IDs.' });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }
};


export const getInterviewSessions = async (req, res) => {
    try {
        // Query reads directly from interview_sessions table without aliases or extra joins
        const queryText = `
            SELECT 
              
                vacancy_id,
                job_applications_id,
                -- Formats date to standard YYYY-MM-DD string matching frontend expectations
                TO_CHAR(session_date, 'YYYY-MM-DD') AS session_date,
                venue,
                conducted_by, 
                remarks
            FROM interview_sessions
            ORDER BY session_date  DESC;
        `;

        const result = await pool.query(queryText);

        return res.status(200).json({
            message: 'Interview sessions retrieved successfully.',
            sessions: result.rows
        });

    } catch (error) {
        console.error('Error fetching interview sessions:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};