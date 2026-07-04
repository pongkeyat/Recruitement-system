import express from 'express';
import { postFullApplication, getFullApplicants } from './applications.controller.js';

const router = express.Router();

router.post('/postFullApplication', postFullApplication);
router.get('/getFullApplicants', getFullApplicants);

export default router;