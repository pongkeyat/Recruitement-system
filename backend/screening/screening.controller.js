export const postInitialScreening = async (req, res) => {
    const {
        job_applications_id,
        education_passed,
        education_remarks, // New
        eligibility_passed,
        eligibility_remarks, // New
        training_passed,
        training_remarks, // New
        experience_passed,
        experience_remarks, // New
        overall_result,
        general_remarks,
        screened_by
    } = req.body;

    // Validation remains same for existing required fields
    if (
        job_applications_id === undefined ||
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

        const appResult = await client.query(
            `SELECT applicant_id FROM applicant_information WHERE job_applications_id = $1`,
            [job_applications_id]
        );

        if (appResult.rows.length === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({ error: "Job application not found." });
        }

        const applicantId = appResult.rows[0].applicant_id;

        // Updated Insert Query
        const newScreening = await client.query(
            `INSERT INTO initial_screening (
                job_applications_id, 
                education_passed, education_remarks,
                eligibility_passed, eligibility_remarks,
                training_passed, training_remarks,
                experience_passed, experience_remarks,
                overall_result, general_remarks, screened_by
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *`,
            [
                job_applications_id,
                education_passed, education_remarks || null,
                eligibility_passed, eligibility_remarks || null,
                training_passed, training_remarks || null,
                experience_passed, experience_remarks || null,
                overall_result, general_remarks, screened_by
            ]
        );

        const applicationStatus = overall_result === "QUALIFIED" ? "Qualified" : "Disqualified";

        await client.query(
            `UPDATE hr_remarks_final_notes SET application_status = $1 WHERE applicant_id = $2`,
            [applicationStatus, applicantId]
        );

        await client.query("COMMIT");

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