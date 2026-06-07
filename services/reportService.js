import axios from "axios";

const API =
  "https://mvp-backend-production-2943.up.railway.app";

export const saveReport = async (
  report
) => {
  const response = await axios.post(
    `${API}/reports/save`,
    report
  );

  return response.data;
};

export const getReports = async () => {
  const response = await axios.get(
    `${API}/reports`
  );

  return response.data;
};

export const getReportById = async (
  id
) => {
  const response = await axios.get(
    `${API}/reports/${id}`
  );

  return response.data;
};

export const deleteReport = async (
  id
) => {
  const response = await axios.delete(
    `${API}/reports/${id}`
  );

  return response.data;
};