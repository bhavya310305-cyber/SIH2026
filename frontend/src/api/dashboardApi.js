import api from "./axios";

export const getMonitoringMetrics = async () => {
  const response = await api.get("/user/getMonitoringMetrics");

  return response.data.data;
};