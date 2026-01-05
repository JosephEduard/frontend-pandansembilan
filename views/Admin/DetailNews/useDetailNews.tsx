import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { ToasterContext } from "@/contexts/ToasterContext";
import serviceNews from "@/services/news.service";
import { INews } from "@/types/News";

const useDetailNews = () => {
  const { isReady, query } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getNewsById = async (id: string) => {
    const { data } = await serviceNews.getNewsById(id);

    return data.data;
  };

  const {
    data: dataNews,
    isFetching: isFetchingNews,
    refetch: refetchNews,
  } = useQuery({
    queryKey: ["News"],
    queryFn: () => getNewsById(`${query.id}`),
    enabled: isReady,
  });

  const updateNews = async (payload: INews) => {
    const { data } = await serviceNews.updateNews(`${query.id}`, payload);

    return data.data;
  };

  const {
    isPending: isPendingMutateUpdateNews,
    isSuccess: isSuccessMutateUpdateNews,
    mutate: mutateUpdateNews,
  } = useMutation({
    mutationFn: (payload: INews) => updateNews(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: (result) => {
      refetchNews();
      setToaster({
        type: "success",
        message: "Update News Berhasil",
      });
    },
  });

  const handleUpdateNews = (data: INews) => {
    // Ensure PUT receives the complete resource by merging edited fields
    const payload: INews = {
      title: data.title ?? dataNews?.title,
      text: data.text ?? dataNews?.text,
      // keep banner string URL when not part of the submission
      image:
        typeof data.image === "string"
          ? data.image
          : typeof dataNews?.image === "string"
            ? (dataNews?.image as string)
            : undefined,
      date: data.date ?? dataNews?.date,
    };

    mutateUpdateNews(payload);
  };

  return {
    dataNews,
    handleUpdateNews,
    isPendingMutateUpdateNews,
    isSuccessMutateUpdateNews,
    refetchNews,
    isFetchingNews,
  };
};

export default useDetailNews;
