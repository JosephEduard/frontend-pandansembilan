import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import serviceProjects from "@/services/project.service";

const useProject = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const [selectedId, setSelectedId] = useState<string>("");

  const setURL = () => {
    router.replace({
      query: {
        page: currentPage || PAGE_DEFAULT,
        limit: currentLimit || LIMIT_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const getProjects = async () => {
    let params = `page=${currentPage}&limit=${currentLimit}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await serviceProjects.getProjects(params);
    const { data } = res;
    const normalized = {
      ...data,
      data: Array.isArray(data?.data)
        ? data.data.map((item: any) => {
            const serviceObj = (item as any).service ?? (item as any).serviceId;

            if (serviceObj && typeof serviceObj === "object") {
              const id = (serviceObj as any)._id ?? (serviceObj as any).id;
              const name =
                (serviceObj as any).name ?? (serviceObj as any).title;
              const { service, ...restA } = item as any;
              const { serviceId: serviceIdObj, ...restB } = restA as any;

              return {
                ...restB,
                serviceId: id ?? String(serviceObj),
                serviceName: name ?? "",
              };
            }

            return {
              ...item,
              serviceId:
                (item as any).serviceId ??
                (item as any).serviceId?.toString?.(),
            };
          })
        : data?.data,
    };

    return normalized;
  };

  const {
    data: dataProject,
    isLoading: isLoadingProject,
    isRefetching: isRefetchingProject,
    refetch: refetchProject,
  } = useQuery({
    queryKey: ["Project", currentLimit, currentPage, currentSearch],
    queryFn: () => getProjects(),
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;

    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;

      router.push({
        query: {
          ...router.query,
          // keep limit present so query stays enabled
          limit: router.query.limit || LIMIT_DEFAULT,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    setURL,
    dataProject,
    isLoadingProject,
    currentPage,
    currentLimit,
    currentSearch,
    isRefetchingProject,
    refetchProject,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    selectedId,
    setSelectedId,
  };
};

export default useProject;
