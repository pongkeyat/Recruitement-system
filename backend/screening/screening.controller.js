import pool from "../config/db.js";
import { ScreeningResultEmail } from "./screening.email.services.js";

export const postInitialScreening = async (req, res) => {
    const {
        job_applications_id,
        applicant_id,
        education_passed,
        education_remarks,
        eligibility_passed,
        eligibility_remarks,
        training_passed,
        training_remarks,
        experience_passed,
        experience_remarks,
        overall_result,
        general_remarks,
        screened_by,
        submitted_documents_passed,
        documents_note
    } = req.body;

    // Validation
    if (
        (job_applications_id === undefined && applicant_id === undefined) ||
        education_passed === undefined ||
        eligibility_passed === undefined ||
        training_passed === undefined ||
        experience_passed === undefined ||
        !overall_result ||
        !screened_by
    ) {
        return res.status(400).json({ error: "Required fields are missing." });
    }

    if (!["QUALIFIED", "DISQUALIFIED"].includes(overall_result)) {
        return res.status(400).json({ error: "Invalid overall result." });
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // 1. Updated query to select the correct email column and build a display name
        const appResult = job_applications_id !== undefined
            ? await client.query(
                `SELECT job_applications_id,
                        applicant_id,
                        email_address AS email,
                        first_name,
                        middle_name,
                        last_name,
                        suffix
                 FROM applicant_information 
                 WHERE job_applications_id = $1`,
                [job_applications_id]
              )
            : await client.query(
                `SELECT job_applications_id,
                        applicant_id,
                        email_address AS email,
                        first_name,
                        middle_name,
                        last_name,
                        suffix
                 FROM applicant_information 
                 WHERE applicant_id = $1`,
                [applicant_id]
              );

        if (appResult.rows.length === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({ error: "Job application not found." });
        }

        const resolvedJobApplicationId = appResult.rows[0].job_applications_id;
        const applicantId = appResult.rows[0].applicant_id;
        const applicantEmail = appResult.rows[0].email;
        const applicantName = [
            appResult.rows[0].first_name,
            appResult.rows[0].middle_name,
            appResult.rows[0].last_name,
            appResult.rows[0].suffix
        ].filter(Boolean).join(" ").trim() || applicantEmail;

        // 2. Insert into initial_screening
        const newScreening = await client.query(
            `INSERT INTO initial_screening (
                job_applications_id,
                education_passed, education_remarks,
                eligibility_passed, eligibility_remarks,
                training_passed, training_remarks,
                experience_passed, experience_remarks,
                overall_result, general_remarks, screened_by,
                submitted_documents_passed, documents_note
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *`,
            [
                resolvedJobApplicationId,
                education_passed, education_remarks || null,
                eligibility_passed, eligibility_remarks || null,
                training_passed, training_remarks || null,
                experience_passed, experience_remarks || null,
                overall_result, general_remarks, screened_by,
                submitted_documents_passed !== undefined ? submitted_documents_passed : false,
                documents_note || null
            ]
        );

        const applicationStatus = overall_result === "QUALIFIED" ? "Qualified" : "Disqualified";

        // 3. Update application status
        await client.query(
            `UPDATE hr_remarks_final_notes SET application_status = $1 WHERE applicant_id = $2`,
            [applicationStatus, applicantId]
        );

        // 4. Commit database changes first so data is safely stored before sending email
        await client.query("COMMIT");

        // 5. Trigger the email asynchronously after successful database updates
        if (applicantEmail) {
            ScreeningResultEmail(applicantEmail, applicantName, overall_result)
                .then(() => console.log(`📧 Email sent successfully to ${applicantEmail}`))
                .catch((emailErr) => console.error("❌ Failed to send screening email:", emailErr));
        } else {
            console.warn("⚠️ Screening saved, but no email address was found for this applicant.");
        }

        return res.status(201).json({
            message: "Initial screening submitted successfully.",
            screening: newScreening.rows[0]
        });

    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        client.release();
    }
};