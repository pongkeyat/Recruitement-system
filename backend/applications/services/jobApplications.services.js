
export const insertJobApplication = async (client, data) => {
    const { vacancy_id, date_received, time_received, received_by, submission_type } = data;

    const finalReceivedBy = received_by && received_by.trim() !== "" ? received_by : null;
    const finalSubmissionType = submission_type && submission_type.trim() !== "" ? submission_type : null;

  
    const result = await client.query(
        `INSERT INTO job_applications (vacancy_id, date_received, time_received, received_by, submission_type)
         VALUES($1, $2, $3, $4, $5) RETURNING job_applications_id`,
        [vacancy_id, date_received, time_received, finalReceivedBy, finalSubmissionType]
    );

    return result.rows[0].job_applications_id;
};