import axios from "axios";

const POST_QUALIFICATIONS = import.meta.env.VITE_QUALIFICATIONS

export const postQualifications = async (qualifications_form) => {
    const res = await axios.post(POST_QUALIFICATIONS, qualifications_form)
    return res.data;
}