import express from "express";
import { postInitialScreening } from "../screening/screening.controller.js";

const router = express.Router();

router.post("/postInitialScreening", postInitialScreening);

export default router;