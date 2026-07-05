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
    const res = await axios.get(`${GET_APPLICATIONS_BY_ID}/${id}`);
    return res.data;
}