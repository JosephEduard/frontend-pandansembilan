import endpoint from "./endpoint.constant";

import instance from "@/libs/axios/instance";
import { IProject } from "@/types/Project";

const serviceProjects = {
  getProjects: (params?: string) =>
    instance.get(`${endpoint.PROJECT}?${params}`),
  getProjectsById: (id: string) => instance.get(`${endpoint.PROJECT}/${id}`),
  addProjects: (payload: IProject) => instance.post(endpoint.PROJECT, payload),
  deleteProjects: (id: string) => instance.delete(`${endpoint.PROJECT}/${id}`),
  updateProjects: (id: string, payload: IProject) =>
    instance.put(`${endpoint.PROJECT}/${id}`, payload),
  getProjectsServiceByServiceId: (serviceId: string) =>
    instance.get(`${endpoint.PROJECT}/service/${serviceId}`),
};

export default serviceProjects;
