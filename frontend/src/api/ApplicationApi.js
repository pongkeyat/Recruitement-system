import axios from 'axios';

const POST_APPLICATIONS = import.meta.env.VITE_APPLICATIONS_POST;
const GET_APPLICATIONS = import.meta.env.VITE_APPLICATIONS_GET;

export const postApplications = async (application_form) => {
    const res = await axios.post(POST_APPLICATIONS, application_form);
    return res.data;
};

export const getApplications = async () => {
    const res= await axios.get(GET_APPLICATIONS);
    return res.data;
}