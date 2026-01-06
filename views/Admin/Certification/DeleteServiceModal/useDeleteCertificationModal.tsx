import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { ToasterContext } from "@/contexts/ToasterContext";
import serviceCertifications from "@/services/certification.service";

const useDeleteCertificationModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteCertification = async (id: string) => {
    const res = await serviceCertifications.deleteCertifications(id);

    return res;
  };

  const {
    isPending: isPendingMutateDeleteCertification,
    isSuccess: isSuccessMutateDeleteCertification,
    mutate: mutateDeleteCertification,
  } = useMutation({
    mutationFn: deleteCertification,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Sertifikat berhasil dihapus",
      });
    },
  });

  return {
    mutateDeleteCertification,
    isPendingMutateDeleteCertification,
    isSuccessMutateDeleteCertification,
  };
};

export default useDeleteCertificationModal;
