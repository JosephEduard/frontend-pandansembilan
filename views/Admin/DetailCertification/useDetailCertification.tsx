import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { ToasterContext } from "@/contexts/ToasterContext";
import serviceCertifications from "@/services/certification.service";
import { ICertification } from "@/types/Certification";

const useDetailCertification = () => {
  const { isReady, query } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getCertificationById = async (id: string) => {
    const { data } = await serviceCertifications.getCertificationsById(id);

    return data.data;
  };

  const {
    data: dataCertification,
    isFetching: isFetchingCertification,
    refetch: refetchCertification,
  } = useQuery({
    queryKey: ["Certification"],
    queryFn: () => getCertificationById(`${query.id}`),
    enabled: isReady,
  });

  const updateCertification = async (payload: ICertification) => {
    const { data } = await serviceCertifications.updateCertifications(
      `${query.id}`,
      payload,
    );

    return data.data;
  };

  const {
    isPending: isPendingMutateUpdateCertification,
    isSuccess: isSuccessMutateUpdateCertification,
    mutate: mutateUpdateCertification,
  } = useMutation({
    mutationFn: (payload: ICertification) => updateCertification(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: (result) => {
      refetchCertification();
      setToaster({
        type: "success",
        message: "Update sertifikat berhasil",
      });
    },
  });

  const handleUpdateCertification = (data: ICertification) => {
    // Ensure PUT receives the complete resource by merging edited fields
    const payload: ICertification = {
      title: data.title ?? dataCertification?.title,
      description: data.description ?? dataCertification?.description,
      year: data.year ?? dataCertification?.year,
      status: data.status ?? dataCertification?.status,
      // keep banner string URL when not part of the submission
      file:
        typeof data.file === "string"
          ? data.file
          : typeof dataCertification?.file === "string"
            ? (dataCertification?.file as string)
            : undefined,
    };

    mutateUpdateCertification(payload);
  };

  return {
    dataCertification,
    handleUpdateCertification,
    isPendingMutateUpdateCertification,
    isSuccessMutateUpdateCertification,
    refetchCertification,
    isFetchingCertification,
  };
};

export default useDetailCertification;
