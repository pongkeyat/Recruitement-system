import express from 'express';
import { postRemarks } from './remarks.controller.js';

const router = express.Router();

router.post('/postRemarks', postRemarks);

export default router;