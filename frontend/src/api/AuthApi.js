import axios from 'axios'

axios.defaults.withCredentials = true

const LOGIN_API = import.meta.env.VITE_LOGIN_API
const PROFILE_API = import.meta.env.VITE_PROFILE_API
const LOGOUT_API = import.meta.env.VITE_LOGOUT_API
const REGISTER_API = import.meta.env.VITE_REGISTER_API
const UPDATE_PASSWORD_API = import.meta.env.VITE_UPDATE_PASSWORD

export const loginUser = async (form) => {
    const res = await axios.post(LOGIN_API, form, { withCredentials: true })
    return res.data
}

export const registerUser = async (form) => {
    const res = await axios.post(REGISTER_API, form, { withCredentials: true })
    return res.data
}

export const getProfile = async (token) => {
    const res = await axios.get(PROFILE_API, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    })
    return res.data
}

export const logoutUser = async (token) => {
    const res = await axios.post(
        LOGOUT_API,
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    )
    return res.data
}


export const updatePasswordApi = async (data, token) => {
    const res = await axios.post(
        UPDATE_PASSWORD_API,
        { 
            currentPassword: data.currentPassword,
            newPassword: data.newPassword 
        },
        { 
            headers: { 
                Authorization: `Bearer ${token}` 
            },
            withCredentials: true,
        }
    );
    return res.data;
};
