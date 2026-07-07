import axios from 'axios';

const POST_APPLICATIONS = import.meta.env.VITE_APPLICATIONS_POST;
const GET_APPLICATIONS = import.meta.env.VITE_APPLICATIONS_GET;
const GET_APPLICATIONS_BY_ID = import.meta.env.VITE_APPLICATIONS_GET_BY_ID;

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