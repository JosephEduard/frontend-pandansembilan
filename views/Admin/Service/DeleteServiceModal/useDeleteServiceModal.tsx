import { ToasterContext } from "@/contexts/ToasterContext";
import serviceServices from "@/services/service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteServiceModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteService = async (id: string) => {
    const res = await serviceServices.deleteService(id);
    return res;
  };

  const {
    mutate: mutateDeleteService,
    isPending: isPendingMutateDeleteService,
    isSuccess: isSuccessMutateDeleteService,
  } = useMutation({
    mutationFn: deleteService,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Service berhasil dihapus",
      });
    },
  });

  return {
    mutateDeleteService,
    isPendingMutateDeleteService,
    isSuccessMutateDeleteService,
  };
};

export default useDeleteServiceModal;
