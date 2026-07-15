import pool from "../config/db.js";

export const postAssessmentCriteria = async (req, res) => {
    const {
        name,
        description,
        max_points,
        display_order,
        is_manual = false
    } = req.body;

    if (
        !name ||
        max_points === undefined ||
        display_order === undefined
    ) {
        return res.status(400).json({
            error: "Name, Maximum Points, and Display Order are required."
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO assessment_criteria
            (
                name,
                description,
                max_points,
                display_order,
                is_manual
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                name,
                description || "",
                max_points,
                display_order,
                is_manual
            ]
        );

        return res.status(201).json({
            message: "Assessment criterion created successfully.",
            criterion: result.rows[0]
        });

    } catch (error) {
        console.error("Error creating assessment criterion:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};


export const getAssessmentCriteria = async (req, res) => {
    try {

        const result = await pool.query(
            `
            SELECT
                assessment_criteria_id,
                name,
                description,
                max_points,
                display_order,
                is_manual
            FROM assessment_criteria
            WHERE is_active = TRUE
            ORDER BY display_order ASC
            `
        );

        return res.status(200).json({
            criteria: result.rows
        });

    } catch (error) {

        console.error("Error fetching assessment criteria:", error);

        return res.status(500).json({
            error: "Internal server error"
        });

    }
};