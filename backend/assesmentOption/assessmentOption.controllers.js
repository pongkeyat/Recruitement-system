import pool from "../config/db.js";

// Create Assessment Option
export const postAssessmentOption = async (req, res) => {
    const {
        assessment_criteria_id,
        qualification,
        score,
        display_order
    } = req.body;

    if (
        !assessment_criteria_id ||
        !qualification ||
        score === undefined ||
        display_order === undefined
    ) {
        return res.status(400).json({
            error: "All fields are required."
        });
    }

    try {
        const result = await pool.query(
            `
            INSERT INTO assessment_options
            (
                assessment_criteria_id,
                qualification,
                score,
                display_order
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [
                assessment_criteria_id,
                qualification,
                score,
                display_order
            ]
        );

        return res.status(201).json({
            message: "Assessment option created successfully.",
            option: result.rows[0]
        });

    } catch (error) {

        console.error("Error creating assessment option:", error);

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// Get Assessment Options by Assessment Criteria
export const getAssessmentOptionsByAssessmentCriteria = async (req, res) => {

    const { assessmentCriteriaId } = req.params;

    try {

        const result = await pool.query(
            `
            SELECT
                assessment_option_id,
                assessment_criteria_id,
                qualification,
                score,
                display_order
            FROM assessment_options
            WHERE assessment_criteria_id = $1
              AND is_active = TRUE
            ORDER BY display_order ASC
            `,
            [assessmentCriteriaId]
        );

        return res.status(200).json(result.rows);

    } catch (error) {

        console.error("Error fetching assessment options:", error);

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }

};


// Update Assessment Option
export const updateAssessmentOption = async (req, res) => {

    const { id } = req.params;

    const {
        qualification,
        score,
        display_order
    } = req.body;

    try {

        const result = await pool.query(
            `
            UPDATE assessment_options
            SET
                qualification = $1,
                score = $2,
                display_order = $3
            WHERE assessment_option_id = $4
            RETURNING *
            `,
            [
                qualification,
                score,
                display_order,
                id
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "Assessment option not found."
            });
        }

        return res.status(200).json({
            message: "Assessment option updated successfully.",
            option: result.rows[0]
        });

    } catch (error) {

        console.error("Error updating assessment option:", error);

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }

};


// Soft Delete Assessment Option
export const deleteAssessmentOption = async (req, res) => {

    const { id } = req.params;

    try {

        const result = await pool.query(
            `
            UPDATE assessment_options
            SET is_active = FALSE
            WHERE assessment_option_id = $1
            RETURNING *
            `,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "Assessment option not found."
            });
        }

        return res.status(200).json({
            message: "Assessment option deleted successfully."
        });

    } catch (error) {

        console.error("Error deleting assessment option:", error);

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }

};