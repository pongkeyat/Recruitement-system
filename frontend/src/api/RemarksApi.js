import axios from 'axios';

const POST_REMARKS = import.meta.env.VITE_REMARKS

export const postRemarks = async (remarks_form) => {
    const res = await axios.post(POST_REMARKS, remarks_form)
    return res.data;
}