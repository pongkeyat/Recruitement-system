export const insertHRRemarks = async (client, applicantId, data) => {
    const { 
        hr_remarks_notes, 
        application_status 
    } = data;

    // Clean text fields (preserve null if it's empty or omitted)
    const cleanHRRemarksNotes = hr_remarks_notes && hr_remarks_notes.trim() !== "" 
        ? hr_remarks_notes.trim() 
        : null;

    // Clean and match the casing for the application status constraint
    const cleanApplicationStatus = application_status && application_status.trim() !== "" 
        ? application_status.trim()
        : null;

    const result = await client.query(
        `INSERT INTO hr_remarks_final_notes (
            applicant_id,
            hr_remarks_notes,
            application_status
        ) VALUES ($1, $2, $3)
        RETURNING *`, 
        [
            applicantId,
            cleanHRRemarksNotes,
            cleanApplicationStatus
        ]
    );

    return result.rows[0];
};