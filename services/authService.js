import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export const signup =
  async (userData) => {

    const response =
      await axios.post(
        `${API_URL}/auth/signup`,
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