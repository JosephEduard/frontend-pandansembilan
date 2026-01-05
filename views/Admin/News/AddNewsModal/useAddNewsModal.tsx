import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import serviceNews from "@/services/news.service";
import { INews } from "@/types/News";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Please enter news title"),
  text: yup.string().required("Please enter news description"),
  image: yup.mixed<FileList | string>().required("Please upload News image"),
  // Accept string from input, ensure it's a valid date
  date: yup
    .string()
    .required("Please enter news date")
    .test("is-valid-date", "Invalid date", (value) => {
      if (!value) return false;
      const d = new Date(value);
      return !isNaN(d.getTime());
    }),
});

const useAddNewsModal = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    handleSubmit: handleSubmitFormNews,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("image");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValue("image", fileUrl);
        },
      });
    }
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("image");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    const fileUrl = getValues("image");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => {
          reset();
          onClose();
        },
      });
    } else {
      reset();
      onClose();
    }
  };

  const addNews = async (payload: INews) => {
    const res = await serviceNews.addNews(payload);
    return res;
  };

  const {
    mutate: mutateAddNews,
    isPending: isPendingMutateAddNews,
    isSuccess: isSuccessMutateAddNews,
  } = useMutation({
    mutationFn: addNews,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "News added successfully",
      });
      reset();
    },
  });

  const handleAddNews = (data: INews) => {
    const isoDate = data.date
      ? (() => {
          // Use selected date with device's current time (hours, minutes, seconds)
          const now = new Date();
          const base = new Date(data.date as unknown as string);
          base.setHours(
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
            now.getMilliseconds(),
          );
          return base.toISOString();
        })()
      : undefined;
    const payload: INews = {
      ...data,
      date: isoDate,
    };
    mutateAddNews(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitFormNews,
    handleAddNews,
    isPendingMutateAddNews,
    isSuccessMutateAddNews,
    handleUploadBanner,
    isPendingMutateUploadFile,
    watch,
    preview,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,
  };
};

export default useAddNewsModal;
