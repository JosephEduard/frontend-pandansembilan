import endpoint from "./endpoint.constant";

import instance from "@/libs/axios/instance";
import { IService } from "@/types/Service";

const serviceServices = {
  getServices: (params?: string) =>
    instance.get(`${endpoint.SERVICE}?${params}`),
  getServiceById: (id: string) => instance.get(`${endpoint.SERVICE}/${id}`),
  addService: (payload: IService) => instance.post(endpoint.SERVICE, payload),
  deleteService: (id: string) => instance.delete(`${endpoint.SERVICE}/${id}`),
  updateService: (id: string, payload: IService) =>
    instance.put(`${endpoint.SERVICE}/${id}`, payload),
};

export default serviceServices;
