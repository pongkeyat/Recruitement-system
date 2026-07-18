import express from "express";
import { postAssessmentResult } from "../ranking/ranking.controllers.js";

const router = express.Router();

router.post("/postRanking", postAssessmentResult);

export default router;