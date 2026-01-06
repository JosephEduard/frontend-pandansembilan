import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { ToasterContext } from "@/contexts/ToasterContext";
import serviceProjects from "@/services/project.service";

const useDeleteProjectModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteProject = async (id: string) => {
    const res = await serviceProjects.deleteProjects(id);

    return res;
  };

  const {
    isPending: isPendingMutateDeleteProject,
    isSuccess: isSuccessMutateDeleteProject,
    mutate: mutateDeleteProject,
  } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Proyek berhasil dihapus",
      });
    },
  });

  return {
    mutateDeleteProject,
    isPendingMutateDeleteProject,
    isSuccessMutateDeleteProject,
  };
};

export default useDeleteProjectModal;
