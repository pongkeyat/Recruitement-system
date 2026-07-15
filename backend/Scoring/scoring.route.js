import express from "express";
import {
    postAssessmentCriteria,
    getAssessmentCriteria
} from "./scoring.controllers.js";

const router = express.Router();

// Create Assessment Criterion
router.post("/postScores", postAssessmentCriteria);
router.get(
    "/getAssessmentCriteria",
    getAssessmentCriteria
);

export default router;