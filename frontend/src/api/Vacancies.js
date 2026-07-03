import axios from 'axios';

const POST_VACANCIES = import.meta.env.VITE_VACANCIES_POST || 'http://localhost:5000/api/vacancies/postVacancy'
const GET_VACANCIES = import.meta.env.VITE_VACANCIES_GET || 'http://localhost:5000/api/vacancies/getVacancy'

export const postVacancies = async (vacancy_form) => {
    const res = await axios.post(POST_VACANCIES, vacancy_form)
    return res.data;
}

export const getVacancies = async () => {
    try {
        const res = await axios.get(GET_VACANCIES);
        const data = res.data;
        if (Array.isArray(data)) return data;
        if (data == null) return [];
        if (Array.isArray(data.vacancy)) return data.vacancy;
        if (Array.isArray(data.rows)) return data.rows;
        if (data.vacancy && typeof data.vacancy === 'object') return [data.vacancy];
        if (data.rows && typeof data.rows === 'object') return [data.rows];
        console.warn('Unexpected vacancies response shape, returning empty array:', data);
        return [];
    } catch (error) {
        console.error("Error fetching vacancies from API:", error.message);
        // Throw the error so your React component can catch it and show an error UI/toast
        throw error; 
    }
};