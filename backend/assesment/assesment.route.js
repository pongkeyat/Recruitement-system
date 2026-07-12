import express from "express";
import { 
    postInterviewSession, 
    getInterviewSessions
} from "../assesment/assesment.controllers.js";

const router = express.Router();

// Route for creating a session and getting all sessions
router.post("/post-interview-sessions", postInterviewSession);
router.get("/get-interview-sessions", getInterviewSessions)




export default router;