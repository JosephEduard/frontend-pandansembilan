import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { INews } from "@/types/News";
import serviceNews from "@/services/news.service";
import useMediaHandling from "@/hooks/useMediaHandling";
import { ToasterContext } from "@/contexts/ToasterContext";

const schema = yup.object({
  title: yup.string().required("Mohon masukkan judul berita"),
  text: yup.string().required("Mohon masukkan deskripsi berita"),
  image: yup
    .mixed<FileList | string>()
    .required("Mohon unggah gambar berita")
    .test("fileSize", "Ukuran file maksimal 5MB.", (value) => {
      if (typeof value === "string") return true; // already uploaded, skip size check
      if (!value || (value as FileList).length === 0) return true; // let required handle empty
      const files = Array.from(value as FileList);
      const MAX = 5 * 1024 * 1024;

      return files.every((f) => (f?.size ?? 0) <= MAX);
    }),
  // Accept string from input, ensure it's a valid date
  date: yup
    .string()
    .required("Mohon masukkan tanggal berita")
    .test("is-valid-date", "Invalid Date", (value) => {
      if (!value) return false;
      const d = new Date(value);

      return !isNaN(d.getTime());
    }),
});

const useAddNewsModal = () => {
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    mutateUploadFile,
  } = useMediaHandling();

  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit: handleSubmitFormNews,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("image");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      const MAX_FILE_SIZE = 5 * 1024 * 1024;

      const fileArray = Array.from(files);
      const oversize = fileArray.find((f) => (f?.size ?? 0) > MAX_FILE_SIZE);

      if (oversize) {
        setToaster({
          type: "error",
          message: "Ukuran file maksimal 5MB.",
        });
        onChange(undefined); // clear selection (optional)

        return;
      }
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
    isPending: isPendingMutateAddNews,
    isSuccess: isSuccessMutateAddNews,
    mutate: mutateAddNews,
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
        message: "Berita berhasil ditambahkan",
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
