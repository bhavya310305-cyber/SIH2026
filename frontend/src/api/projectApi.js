import api from "./axios";

export const getProjects = async (params = {}) => {
  const response = await api.get("/user/getprojects", { params });
  return response.data;
};

export const getProjectUpdates = async (projectId) => {
  const response = await api.get(
    `/user/getProgressUpdates/${projectId}`
  );
  return response.data;
};