import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { ToasterContext } from "@/contexts/ToasterContext";
import serviceNews from "@/services/news.service";

const useDeleteNewsModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteNews = async (id: string) => {
    const res = await serviceNews.deleteNews(id);

    return res;
  };

  const {
    isPending: isPendingMutateDeleteNews,
    isSuccess: isSuccessMutateDeleteNews,
    mutate: mutateDeleteNews,
  } = useMutation({
    mutationFn: deleteNews,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berita berhasil dihapus",
      });
    },
  });

  return {
    mutateDeleteNews,
    isPendingMutateDeleteNews,
    isSuccessMutateDeleteNews,
  };
};

export default useDeleteNewsModal;
