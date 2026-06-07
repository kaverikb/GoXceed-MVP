import axios from "axios";

const API_URL =
  "https://mvp-backend-production-2943.up.railway.app";

export const sendMessage =
  async (
    message,
    document = null
  ) => {

    const response =
      await axios.post(
        `${API_URL}/chat/`,
        {
          message,
          document,
        }
      );

    return response.data.response;
  };