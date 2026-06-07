import axios from "axios";

const API_URL =
  "https://mvp-backend-production-2943.up.railway.app";

export const signup =
  async (userData) => {

    const response =
      await axios.post(
        `${API_URL}/auth/signup/`,
        userData
      );

    return response.data;
  };

export const login =
  async (userData) => {

    const response =
      await axios.post(
        `${API_URL}/auth/login`,
        userData
      );

    return response.data;
  };