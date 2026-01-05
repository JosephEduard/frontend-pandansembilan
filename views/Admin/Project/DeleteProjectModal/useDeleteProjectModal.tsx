import { ToasterContext } from "@/contexts/ToasterContext";
import serviceProjects from "@/services/project.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteProjectModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteProject = async (id: string) => {
    const res = await serviceProjects.deleteProjects(id);
    return res;
  };

  const {
    mutate: mutateDeleteProject,
    isPending: isPendingMutateDeleteProject,
    isSuccess: isSuccessMutateDeleteProject,
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
        message: "Project berhasil dihapus",
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
