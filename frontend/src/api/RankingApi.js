import axios from "axios";

const POST_RANKING = import.meta.env.VITE_RANKING_POST;

export const postRanking = async (data) => {
  try {
    const response = await axios.post(POST_RANKING, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};