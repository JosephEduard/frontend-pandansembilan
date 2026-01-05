import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import serviceNews from "@/services/news.service";

const useNews = () => {
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

  const getNews = async () => {
    let params = `page=${currentPage}&limit=${currentLimit}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await serviceNews.getNews(params);
    const { data } = res;

    return data;
  };

  const {
    data: dataNews,
    isLoading: isLoadingNews,
    isRefetching: isRefetchingNews,
    refetch: refetchNews,
  } = useQuery({
    queryKey: ["News", currentLimit, currentPage, currentSearch],
    queryFn: () => getNews(),
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
    dataNews,
    isLoadingNews,
    currentPage,
    currentLimit,
    currentSearch,
    isRefetchingNews,
    refetchNews,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    selectedId,
    setSelectedId,
  };
};

export default useNews;
