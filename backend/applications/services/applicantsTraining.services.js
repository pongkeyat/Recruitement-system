export const insertApplicantsTraining = async (client, applicantId, data) => {
    const { 
        training_title, 
        date_from, 
        date_to, 
        hours_attended, 
        training_type, 
        conducted_by 
    } = data;


    const cleanTrainingTitle = training_title && training_title.trim() !== "" 
        ? training_title.trim().toUpperCase() 
        : null;

    const cleanTrainingType = training_type && training_type.trim() !== "" 
        ? training_type.trim().toUpperCase() 
        : null;

    const cleanConductedBy = conducted_by && conducted_by.trim() !== "" 
        ? conducted_by.trim().toUpperCase() 
        : null;


    const cleanDateFrom = date_from || null;
    const cleanDateTo = date_to || null;


    const cleanHoursAttended = hours_attended !== undefined && hours_attended !== null && hours_attended !== ""
        ? Number(hours_attended)
        : null;


    const result = await client.query(
        `INSERT INTO relevant_trainings (
            applicant_id,
            training_title,
            date_from,
            date_to,
            hours_attended,
            training_type,
            conducted_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`, 
        [
            applicantId,
            cleanTrainingTitle,
            cleanDateFrom,
            cleanDateTo,
            cleanHoursAttended,
            cleanTrainingType,
            cleanConductedBy
        ]
    );

 
    return result.rows[0];
};