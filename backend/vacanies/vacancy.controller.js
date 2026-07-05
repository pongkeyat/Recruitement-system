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
            `INSERT INTO vacancies (position_title, salary_grade, office_unit, no_of_slots, application_posted, application_deadline)
             VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [position_title, salary_grade, office_unit, no_of_slots, application_posted, application_deadline]
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
        const vacancy = await pool.query(`
            SELECT 
                vacancies.vacancy_id, 
                vacancies.position_title, 
                vacancies.salary_grade, 
                vacancies.office_unit, 
                vacancies.no_of_slots, 
                vacancies.application_posted, 
                vacancies.application_deadline,
                remarks.remark_text,
                vacancy_specific_qualifications.education_requirement,   
                vacancy_specific_qualifications.training_requirement,    
                vacancy_specific_qualifications.experience_requirement,  
                vacancy_specific_qualifications.eligibility_requirement,
                (
                    SELECT COUNT(DISTINCT applicant_information.applicant_id)
                    FROM job_applications
                    LEFT JOIN applicant_information
                        ON job_applications.job_applications_id = applicant_information.job_applications_id
                    WHERE job_applications.vacancy_id = vacancies.vacancy_id
                ) AS applicants_count,
                (
                    SELECT hr_remarks_final_notes.application_status
                    FROM job_applications
                    LEFT JOIN applicant_information
                        ON job_applications.job_applications_id = applicant_information.job_applications_id
                    LEFT JOIN hr_remarks_final_notes
                        ON applicant_information.applicant_id = hr_remarks_final_notes.applicant_id
                    WHERE job_applications.vacancy_id = vacancies.vacancy_id
                      AND hr_remarks_final_notes.application_status IS NOT NULL
                    ORDER BY job_applications.date_received DESC,
                             job_applications.time_received DESC,
                             job_applications.job_applications_id DESC,
                             hr_remarks_final_notes.hr_remarks_id DESC
                    LIMIT 1
                ) AS application_status
            FROM vacancies
            LEFT JOIN vacancy_specific_qualifications ON vacancies.vacancy_id = vacancy_specific_qualifications.vacancy_id
            LEFT JOIN remarks ON vacancies.vacancy_id = remarks.vacancy_id;
        `);

        return res.status(200).json(vacancy.rows);
    } 
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'ERROR FETCHING DATA' });
    }
};