import axios from 'axios';

const POST_APPLICATIONS = import.meta.env.VITE_APPLICATIONS_POST;
const GET_APPLICATIONS = import.meta.env.VITE_APPLICATIONS_GET;
const GET_APPLICATIONS_BY_ID = import.meta.env.VITE_APPLICATIONS_GET_BY_ID;
const VITE_APPLICATIONS_QUALIFICATIONS = import.meta.env.VITE_APPLICATIONS_QUALIFICATIONS;

export const postApplications = async (application_form) => {
    const res = await axios.post(POST_APPLICATIONS, application_form);
    return res.data;
};

export const getApplications = async () => {
    const res= await axios.get(GET_APPLICATIONS);
    return res.data;
}

export const getApplicationById = async (id) => {
    // 💡 Prevent issues if the id is missing or improperly formed
    if (!id) {
        console.error("API Error: getApplicationById was called without an ID");
        return null;
    }

    // Ensure there is no trailing slash on the base URL string to prevent doubling up '//'
    const baseUrl = GET_APPLICATIONS_BY_ID.endsWith('/') 
        ? GET_APPLICATIONS_BY_ID.slice(0, -1) 
        : GET_APPLICATIONS_BY_ID;

    console.log(`[API Network Request] Fetching details from: ${baseUrl}/${id}`);
    
    const res = await axios.get(`${baseUrl}/${id}`);
    return res.data;
};

export const getApplicationsByVacancyId = async (vacancyId) => {
    if (!vacancyId) return [];
    try {
        const res = await axios.get(GET_APPLICATIONS);
        const payload = res.data;

        let rows = [];
        if (Array.isArray(payload)) rows = payload;
        else if (Array.isArray(payload.data)) rows = payload.data;
        else if (Array.isArray(payload.rows)) rows = payload.rows;
        else if (Array.isArray(payload.applications)) rows = payload.applications;

        // 1. Filter by vacancy_id
        const filtered = rows.filter(r => String(r.vacancy_id) === String(vacancyId));

        // 2. Map the data cleanly for your modal dropdown
        return filtered.map(r => ({
            ...r,
            // Point the modal's expected singular key to your actual backend plural property
            job_application_id: r.job_applications_id, 
            
            // Build the string your dropdown uses to show the applicant's name
            candidate_name: r.first_name ? `${r.first_name} ${r.last_name || ''}`.trim() : null
        }));
        
    } catch (error) {
        console.error(`Error filtering applications for vacancy ${vacancyId}:`, error.message);
        return [];
    }
};


const POST_APPLICANT_QUALIFICATIONS = import.meta.env.VITE_APPLICATIONS_QUALIFICATIONS;

export const postApplicantQualifications = async (qualificationsData) => {
    try {
        // Ensure you have the required applicant_id in the payload
        if (!qualificationsData.applicant_id) {
            throw new Error("Applicant ID is required to save qualifications.");
        }

        const res = await axios.post(POST_APPLICANT_QUALIFICATIONS, qualificationsData);
        return res.data;
    } catch (error) {
        console.error("API Error: Failed to post applicant qualifications:", error.response?.data || error.message);
        // Re-throw the error so the UI component can handle it (e.g., showing a toast notification)
        throw error;
    }
};