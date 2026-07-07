import express from 'express';
import { registerUser, loginUser, getUserProfile, logoutUser, updatePassword} from './users.controllers.js';
import {protect} from './users.middleware.js';

const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.get('/getUser', protect, getUserProfile);
router.post('/logoutUser', logoutUser);
router.post('/updatePassword', protect, updatePassword);

export default router;