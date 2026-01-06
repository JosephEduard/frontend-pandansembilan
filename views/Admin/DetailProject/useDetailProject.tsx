import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { ToasterContext } from "@/contexts/ToasterContext";
import serviceProjects from "@/services/project.service";
import { IProject } from "@/types/Project";

const useDetailProject = () => {
  const { isReady, query } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getProjectById = async (id: string) => {
    const { data } = await serviceProjects.getProjectsById(id);

    return data.data;
  };

  const {
    data: dataProject,
    isFetching: isFetchingProject,
    refetch: refetchProject,
  } = useQuery({
    queryKey: ["Project"],
    queryFn: () => getProjectById(`${query.id}`),
    enabled: isReady,
  });

  const updateProject = async (payload: IProject) => {
    const { data } = await serviceProjects.updateProjects(
      `${query.id}`,
      payload,
    );

    return data.data;
  };

  const {
    isPending: isPendingMutateUpdateProject,
    isSuccess: isSuccessMutateUpdateProject,
    mutate: mutateUpdateProject,
  } = useMutation({
    mutationFn: (payload: IProject) => updateProject(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: (result) => {
      refetchProject();
      setToaster({
        type: "success",
        message: "Update proyek berhasil",
      });
    },
  });

  const handleUpdateProject = (data: IProject) => {
    // Ensure PUT receives the complete resource by merging edited fields
    const payload: IProject = {
      title: data.title ?? dataProject?.title,
      description: data.description ?? dataProject?.description,
      address: data.address ?? dataProject?.address,
      year: data.year ?? dataProject?.year,
      serviceId: data.serviceId ?? dataProject?.serviceId,
      status: data.status ?? dataProject?.status,
    };

    mutateUpdateProject(payload);
  };

  return {
    dataProject,
    handleUpdateProject,
    isPendingMutateUpdateProject,
    isSuccessMutateUpdateProject,
    refetchProject,
    isFetchingProject,
  };
};

export default useDetailProject;
