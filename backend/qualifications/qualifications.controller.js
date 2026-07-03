import pool from "../config/db.js";

export const postQualification = async (req , res) => {

    const { vacancy_id, education_requirement, training_requirement, experience_requirement, eligibility_requirement } = req.body;


    if (!vacancy_id || !education_requirement || !training_requirement || !experience_requirement || !eligibility_requirement){
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newQualifications = await pool.query(
            `INSERT INTO vacancy_specific_qualifications (vacancy_id, education_requirement, training_requirement, experience_requirement, eligibility_requirement)
             VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [vacancy_id, education_requirement, training_requirement, experience_requirement, eligibility_requirement]
        );

        return res.status(201).json({ qualifications: newQualifications.rows[0] });
    }
    catch (error) {
        console.error('Error creating qualifications:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}