import axios from "axios";

const API_URL =
  "https://mvp-backend-production-2943.up.railway.app";

export const runResearch =
  async (company) => {

    const response =
      await axios.post(
        `${API_URL}/research`,
        {
          company,
        }
      );

    return response.data.research;
  };

export const summarizeResearch =
  async (content) => {

    const response =
      await axios.post(
        `${API_URL}/research/summarize`,
        {
          content,
        }
      );

    return response.data.summary;
  };