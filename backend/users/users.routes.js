import express from 'express';
import { registerUser, loginUser, getUserProfile, logoutUser} from './users.controllers.js';
import {protect} from './users.middleware.js';

const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.get('/getUser', protect, getUserProfile);
router.post('/logoutUser', logoutUser);

export default router;