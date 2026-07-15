import express from "express";

import {
    postAssessmentOption,
    getAssessmentOptionsByAssessmentCriteria,
    updateAssessmentOption,
    deleteAssessmentOption
} from "../assesmentOption/assessmentOption.controllers.js";

const router = express.Router();

// Create Assessment Option
router.post(
    "/postAssessmentOption",
    postAssessmentOption
);

// Get Assessment Options by Assessment Criteria
router.get(
    "/getAssessmentOptionsByAssessmentCriteria/:assessmentCriteriaId",
    getAssessmentOptionsByAssessmentCriteria
);

// Update Assessment Option
router.put(
    "/updateAssessmentOption/:assessmentOptionId",
    updateAssessmentOption
);

// Delete (Soft Delete) Assessment Option
router.delete(
    "/deleteAssessmentOption/:assessmentOptionId",
    deleteAssessmentOption
);

export default router;