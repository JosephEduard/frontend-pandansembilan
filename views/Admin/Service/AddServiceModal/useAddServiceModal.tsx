import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { IService } from "@/types/Service";
import serviceServices from "@/services/service";
import useMediaHandling from "@/hooks/useMediaHandling";
import { ToasterContext } from "@/contexts/ToasterContext";

const schema = yup.object().shape({
  name: yup.string().required("Mohohn masukkan nama layanan"),
  description: yup.string().required("Mohon masukkan deskripsi layanan"),
  banner: yup
    .mixed<FileList | string>()
    .required("Mohon unggah banner layanan")
    .test("fileSize", "Ukuran file maksimal 5MB.", (value) => {
      if (typeof value === "string") return true; // already uploaded, skip size check
      if (!value || (value as FileList).length === 0) return true; // let required handle empty
      const files = Array.from(value as FileList);
      const MAX = 5 * 1024 * 1024;

      return files.every((f) => (f?.size ?? 0) <= MAX);
    }),
});

const useAddServiceModal = () => {
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
    handleSubmit: handleSubmitFormService,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");

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
          setValue("banner", fileUrl);
        },
      });
    }
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("banner");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    const fileUrl = getValues("banner");

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

  const addService = async (payload: IService) => {
    const res = await serviceServices.addService(payload);

    return res;
  };

  const {
    isPending: isPendingMutateAddService,
    isSuccess: isSuccessMutateAddService,
    mutate: mutateAddService,
  } = useMutation({
    mutationFn: addService,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Layanan berhasil ditambahkan",
      });
      reset();
    },
  });

  const handleAddService = (data: IService) => mutateAddService(data);

  return {
    control,
    errors,
    reset,
    handleSubmitFormService,
    handleAddService,
    isPendingMutateAddService,
    isSuccessMutateAddService,
    handleUploadBanner,
    isPendingMutateUploadFile,
    watch,
    preview,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,
  };
};

export default useAddServiceModal;
