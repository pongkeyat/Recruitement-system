import axios from 'axios';

const POST_INTERVIEW_SESSION = import.meta.env.VITE_ASSESMENT_POST;
const GET_INTERVIEW_SESSIONS = import.meta.env.VITE_ASSESMENT_GET;
const GET_ASSESSMENT_CRITERIA = import.meta.env.VITE_ASSESSMENT_CRITERIA_GET;
const GET_ASSESSMENT_OPTIONS = import.meta.env.VITE_ASSESSMENT_OPTION_GET_BY_CRITERION;

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

export const getInterviewDate = async () => {
    const res = await axios.get(GET_INTERVIEW_SESSIONS);
    
    // 1. Target the 'sessions' property returned by your controller JSON
    const rawSessions = res.data.sessions || [];

    // 2. Transform backend data layout into the shape the Calendar expects
    return rawSessions.map((session, index) => {
        // Parse "YYYY-MM-DD" safely
        const [yearStr, monthStr, dayStr] = (session.session_date || '').split('-');
        
        return {
            ...session,
            // Fallback unique key since ID isn't selected in the query
            id: session.job_applications_id || index, 
            // Convert to matching calendar numbers (React Date month starts at 0)
            year: parseInt(yearStr, 10),
            month: parseInt(monthStr, 10) - 1, 
            day: parseInt(dayStr, 10),
            
            // Map backend fields to missing layout fields in CalendarView markup
            position: `Vacancy #${session.vacancy_id}`, 
            code: `APP-${session.job_applications_id}`,
            timePerApplicant: '30 mins', // Default fallback value
            status: session.remarks || 'Scheduled',
            
            // Layout styling properties
            calBg: 'bg-blue-600',
            statusBg: 'bg-blue-100 text-blue-800'
        };
    });
};

export const getAssessmentCriteria = async () => {
    const response = await axios.get(
        GET_ASSESSMENT_CRITERIA
    );

    return response.data;
};


export const getAssessmentOptionsByAssessmentCriteria = async (
    assessmentCriteriaId
) => {
    const baseUrl = (GET_ASSESSMENT_OPTIONS || "http://localhost:5000/api/assessmentOption/getAssessmentOptionsByAssessmentCriteria")
        .replace(/\/$/, "");
    const response = await axios.get(`${baseUrl}/${assessmentCriteriaId}`);

    return response.data;
};

