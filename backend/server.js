import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import usersAuthRoutes from './users/users.routes.js'
import vacancyRoute from './vacanies/vacancy.routes.js'
import qualificationsRoutes from './qualifications/qualifications.routes.js'
import remarksRoute from './remarks/remarks.routes.js'
import fullApplicationRoutes from './applications/applications.route.js'
import screeningRoutes from './screening/screening.route.js'
import assesmentRoutes from './assesment/assesment.route.js'
import scoresRoutes from './Scoring/scoring.route.js'
import assestmentOptionRoutes from './assesmentOption/assessmentOption.routes.js'
import assessmentResultRoutes from "./ranking/ranking.route.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/usersAuth' , usersAuthRoutes);
app.use('/api/vacancies', vacancyRoute);
app.use('/api/qualifications', qualificationsRoutes);
app.use('/api/remarks', remarksRoute);
app.use('/api/applications', fullApplicationRoutes);
app.use('/api/screening', screeningRoutes);
app.use('/api/assesment', assesmentRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/assessmentOption', assestmentOptionRoutes);
app.use('/api/asssessmentResults', assessmentResultRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})