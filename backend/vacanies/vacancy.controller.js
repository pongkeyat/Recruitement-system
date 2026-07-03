import pool from "../config/db.js";

export const postVacancy = async (req, res) => {
    const { position_title,
        salary_grade,
        office_unit,
        no_of_slots,
        application_posted,
        application_deadline } = req.body;

    if(!position_title || !salary_grade || !office_unit || !no_of_slots || !application_posted || !application_deadline){
        return res.status(400).json({error : 'All Fileds Required'});
    }

    const postedDate = new Date(application_posted).toISOString().split('T')[0];
    const todayDate = new Date().toISOString().split('T')[0];

    if (postedDate !== todayDate) {
        return res.status(400).json({ 
            error: 'The application posted date must be today\'s date.' 
        });
    }

    try {
        // 3. Insert into database
        const newVacancy = await pool.query(
            `INSERT INTO vacancies (position_title, salary_grade, office_unit, no_of_slots, application_posted, application_deadline, status)
             VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [position_title, salary_grade, office_unit, no_of_slots, application_posted, application_deadline, status]
        );

        // 4. Return the successful response
        return res.status(201).json({ vacancy: newVacancy.rows[0] });

    } catch (error) {
        // 5. Catch and log any database or runtime errors
        console.error('Error creating vacancy:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    
}

export const getVacancy = async (req, res) => {
    try {
        const vacancy = await pool.query(
            'SELECT  vacancy_id, position_title, salary_grade, office_unit, no_of_slots, application_posted, application_deadline FROM vacancies'
        );

        return res.status(200).json(vacancy.rows);
    } 
  
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'ERROR FETCHING DATA' });
    }
};