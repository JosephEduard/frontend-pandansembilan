import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IProjectImage } from "@/types/Projectimage";

const serviceProjectImage = {
  addProjectImages: (payload: IProjectImage) =>
    instance.post(endpoint.PROJECT_IMAGE, payload),
  deleteProjectImages: (id: string) =>
    instance.delete(`${endpoint.PROJECT_IMAGE}/${id}`),
  getProjectImagesProjectByProjectId: (projectId: IProjectImage) =>
    instance.get(`${endpoint.PROJECT_IMAGE}/project/${projectId}`),
};
export default serviceProjectImage;
