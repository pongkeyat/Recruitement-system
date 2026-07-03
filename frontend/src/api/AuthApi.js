import axios from 'axios'

const LOGIN_API = import.meta.env.VITE_LOGIN_API
const PROFILE_API = import.meta.env.VITE_PROFILE_API
const LOGOUT_API = import.meta.env.VITE_LOGOUT_API

export const loginUser = async (form) => {
    const res = await axios.post(LOGIN_API, form)
    return res.data
}

export const getProfile = async (token) => {
    const res = await axios.get(PROFILE_API, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export const logoutUser = async (token) => {
    const res = await axios.post(
        LOGOUT_API,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return res.data
}