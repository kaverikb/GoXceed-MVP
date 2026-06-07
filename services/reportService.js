import axios from "axios";

const API =
  "http://127.0.0.1:8000/reports";

export const saveReport = async (
  report
) => {
  const response = await axios.post(
    `${API}/save`,
    report
  );

  return response.data;
};

export const getReports = async () => {
  const response = await axios.get(
    API
  );

  return response.data;
};

export const getReportById = async (
  id
) => {
  const response = await axios.get(
    `${API}/${id}`
  );

  return response.data;
};

export const deleteReport = async (
  id
) => {
  const response = await axios.delete(
    `${API}/${id}`
  );

  return response.data;
};