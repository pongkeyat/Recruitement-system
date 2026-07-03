import express from 'express';
import { postQualification } from './qualifications.controller.js';

const router = express.Router();

router.post('/postQualifications', postQualification);

export default router;