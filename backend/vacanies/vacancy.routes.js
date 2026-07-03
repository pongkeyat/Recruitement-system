import express from 'express';
import { postVacancy, getVacancy } from './vacancy.controller.js';

const router = express.Router();

router.post('/postVacancy', postVacancy);
router.get('/getVacancy' , getVacancy)

export default router;