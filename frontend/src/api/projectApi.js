import api from "./axios";

export const getProjects = async (params = {}) => {
  const response = await api.get("/projects", { params });
  return response.data;
};

export const getProjectUpdates = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/updates`);
  return response.data;
};