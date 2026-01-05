import { ToasterContext } from "@/contexts/ToasterContext";
import serviceNews from "@/services/news.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteNewsModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteNews = async (id: string) => {
    const res = await serviceNews.deleteNews(id);
    return res;
  };

  const {
    mutate: mutateDeleteNews,
    isPending: isPendingMutateDeleteNews,
    isSuccess: isSuccessMutateDeleteNews,
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
        message: "Service berhasil dihapus",
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
