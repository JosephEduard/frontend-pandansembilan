import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { IService } from "@/types/Service";
import { ToasterContext } from "@/contexts/ToasterContext";
import serviceServices from "@/services/service";

const useDetailService = () => {
  const { isReady, query } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getServiceById = async (id: string) => {
    const { data } = await serviceServices.getServiceById(id);

    return data.data;
  };

  const {
    data: dataService,
    isFetching: isFetchingService,
    refetch: refetchService,
  } = useQuery({
    queryKey: ["Service"],
    queryFn: () => getServiceById(`${query.id}`),
    enabled: isReady,
  });

  const updateService = async (payload: IService) => {
    const { data } = await serviceServices.updateService(
      `${query.id}`,
      payload,
    );

    return data.data;
  };

  const {
    isPending: isPendingMutateUpdateService,
    isSuccess: isSuccessMutateUpdateService,
    mutate: mutateUpdateService,
  } = useMutation({
    mutationFn: (payload: IService) => updateService(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: (result) => {
      refetchService();
      setToaster({
        type: "success",
        message: "Update Service Berhasil",
      });
    },
  });

  const handleUpdateService = (data: IService) => {
    // Ensure PUT receives the complete resource by merging edited fields
    const payload: IService = {
      name: data.name ?? dataService?.name,
      description: data.description ?? dataService?.description,
      // keep banner string URL when not part of the submission
      banner:
        typeof data.banner === "string"
          ? data.banner
          : typeof dataService?.banner === "string"
            ? (dataService?.banner as string)
            : undefined,
    };

    mutateUpdateService(payload);
  };

  return {
    dataService,

    handleUpdateService,
    isPendingMutateUpdateService,
    isSuccessMutateUpdateService,
    refetchService,
    isFetchingService,
  };
};

export default useDetailService;
