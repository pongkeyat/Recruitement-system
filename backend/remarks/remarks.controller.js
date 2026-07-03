import pool from "../config/db.js";

export const postRemarks = async (req , res) => {
    const { vacancy_id, remark_text} = req.body;

    if(!remark_text || !vacancy_id){
        return res.status(400).json({error: 'all fields are required'})
    };

    try{

        const newRemarks = await pool.query(
            `INSERT INTO remarks (vacancy_id, remark_text)
            VALUES($1, $2) RETURNING *`,
            [vacancy_id, remark_text]
        )

        return res.status(201).json ({remarks: newRemarks.rows[0]});
    }catch (error) {
        // 5. Catch and log any database or runtime errors
        console.error('Error creating remarks:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    
}