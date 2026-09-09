import api from "./axios";

export const getMonitoringMetrics = async () => {
  const response = await api.get("/getMonitoringMetrics");
  return response.data;
};
