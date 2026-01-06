import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { ToasterContext } from "@/contexts/ToasterContext";
import serviceServices from "@/services/service";

const useDeleteServiceModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteService = async (id: string) => {
    const res = await serviceServices.deleteService(id);

    return res;
  };

  const {
    isPending: isPendingMutateDeleteService,
    isSuccess: isSuccessMutateDeleteService,
    mutate: mutateDeleteService,
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
        message: "Layanan berhasil dihapus",
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
