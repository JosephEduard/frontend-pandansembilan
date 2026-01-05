import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import serviceServices from "@/services/service";
import { IService } from "@/types/Service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please enter service name"),
  description: yup.string().required("Please enter service description"),
  banner: yup
    .mixed<FileList | string>()
    .required("Please upload service banner"),
});

const useAddServiceModal = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    handleSubmit: handleSubmitFormService,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
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
    mutate: mutateAddService,
    isPending: isPendingMutateAddService,
    isSuccess: isSuccessMutateAddService,
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
        message: "Service added successfully",
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
