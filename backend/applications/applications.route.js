import express from 'express';
import { postFullApplication, getFullApplicants, getApplicantById , postApplicantQualifications} from './applications.controller.js';

const router = express.Router();

router.post('/postFullApplication', postFullApplication);
router.get('/getFullApplicants', getFullApplicants);
router.get('/getApplicantById/:id', getApplicantById);
router.get('/postApplicantQualifications', postApplicantQualifications)

export default router;