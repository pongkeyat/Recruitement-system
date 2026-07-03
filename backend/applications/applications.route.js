import express from 'express';
import { postFullApplication } from './applications.controller.js';

const router = express.Router();

router.post('/postFullApplication', postFullApplication);

export default router;