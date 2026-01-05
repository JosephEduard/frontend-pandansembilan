import endpoint from "./endpoint.constant";

import instance from "@/libs/axios/instance";
import { ICertification } from "@/types/Certification";

const serviceCertifications = {
  getCertifications: (params?: string) =>
    instance.get(`${endpoint.CERTIFICATION}?${params}`),
  getCertificationsById: (id: string) =>
    instance.get(`${endpoint.CERTIFICATION}/${id}`),
  addCertifications: (payload: ICertification) =>
    instance.post(endpoint.CERTIFICATION, payload),
  deleteCertifications: (id: string) =>
    instance.delete(`${endpoint.CERTIFICATION}/${id}`),
  updateCertifications: (id: string, payload: ICertification) =>
    instance.put(`${endpoint.CERTIFICATION}/${id}`, payload),
};

export default serviceCertifications;
