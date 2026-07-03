import axios from 'axios';

const POST_APPLICATIONS = import.meta.env.VITE_APPLICATIONS_POST?.trim() || 'http://localhost:5000/api/applications/postFullApplication';

export const postApplications = async (application_form) => {
    const res = await axios.post(POST_APPLICATIONS, application_form);
    return res.data;
};