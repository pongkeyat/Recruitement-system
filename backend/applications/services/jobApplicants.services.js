export const insertApplicantInfo = async (client, jobAppId, data) => {
    const { last_name, first_name, middle_name, suffix, sex, date_of_birth, civil_status, contact_number, email_address, residential_address } = data;

    const cleanSex = sex ? sex.trim().toUpperCase() : null;
    const cleanCivilStatus = civil_status ? civil_status.trim().toUpperCase() : null;
    const cleanSuffix = suffix && suffix.trim() !== "" ? suffix.trim().toUpperCase() : null;
    const cleanMiddleName = middle_name && middle_name.trim() !== "" ? middle_name : null;

    const result = await client.query(
        `INSERT INTO applicant_information (job_applications_id, last_name, first_name, middle_name, suffix, sex, date_of_birth, civil_status, contact_number, email_address, residential_address)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [jobAppId, last_name, first_name, cleanMiddleName, cleanSuffix, cleanSex, date_of_birth, cleanCivilStatus, contact_number, email_address, residential_address]
    );
    return result.rows[0];
};