import pool from "../config/db.js";

export const postAssessmentResult = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      applicant_id,
      session_id,
      evaluator_id,
      total_score,
      remarks,
      details,
    } = req.body;

    // Validation
   const missing = [];

if (!applicant_id) missing.push("applicant_id");
if (!session_id) missing.push("session_id");
if (!evaluator_id) missing.push("evaluator_id");
if (total_score === undefined) missing.push("total_score");
if (!Array.isArray(details)) missing.push("details");
if (Array.isArray(details) && details.length === 0)
  missing.push("details is empty");

if (missing.length > 0) {
  return res.status(400).json({
    success: false,
    message: "Missing required fields.",
    missing,
    body: req.body,
  });
}

    await client.query("BEGIN");

    // Insert assessment header
    const assessmentResult = await client.query(
      `
      INSERT INTO assessment_results
      (
        applicant_id,
        session_id,
        evaluator_id,
        total_score,
        remarks
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING assessment_result_id
      `,
      [
        applicant_id,
        session_id,
        evaluator_id,
        total_score,
        remarks,
      ]
    );

    const assessment_result_id =
      assessmentResult.rows[0].assessment_result_id;

    // Insert assessment details
    for (const item of details) {
      await client.query(
        `
        INSERT INTO assessment_result_details
        (
          assessment_result_id,
          assessment_criteria_id,
          assessment_option_id,
          score
        )
        VALUES ($1,$2,$3,$4)
        `,
        [
          assessment_result_id,
          item.assessment_criteria_id,
          item.assessment_option_id,
          item.score,
        ]
      );
    }

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Assessment saved successfully.",
      assessment_result_id,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to save assessment.",
      error: error.message,
    });
  } finally {
    client.release();
  }
};