import axios from 'axios';

const POST_INTERVIEW_SESSION = import.meta.env.VITE_ASSESMENT_POST;
const GET_INTERVIEW_SESSIONS = import.meta.env.VITE_ASSESMENT_GET; // Binds to your new env variable

export const postAssessmentSession = async (formData) => {
    const res = await axios.post(POST_INTERVIEW_SESSION, {
        vacancy_id: formData.vacancy_id,
        selectedApplicants: Array.isArray(formData.job_applications_id)
            ? formData.job_applications_id
            : [formData.job_applications_id],
        session_date: formData.session_date,
        venue: formData.venue,
        panelists: formData.conducted_by,
        remarks: formData.remarks,
    });
    return res.data;
};

export const postApplications = postAssessmentSession;

// New get function
export const getInterviewSessions = async () => {
    const res = await axios.get(GET_INTERVIEW_SESSIONS);
    return res.data; 
};
