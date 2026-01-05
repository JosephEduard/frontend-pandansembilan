import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import serviceCertifications from "@/services/certification.service";
import { ICertification } from "@/types/Certification";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please enter certificate title"),
  description: yup.string().required("Please enter certificate description"),
  year: yup.string().required("Please enter project year"),
  status: yup.string().optional(),
  file: yup
    .mixed<FileList | string>()
    .required("Please upload file Certificate"),
});

const useAddCertificationModal = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateUploadMultipleFiles,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    handleSubmit: handleSubmitFormCertification,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("file");

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      const first = files[0];
      if (first && first.type === "application/pdf") {
        mutateUploadMultipleFiles({
          files,
          callback: (urls: string[]) => {
            setValue("file", urls[0]);
          },
        });
      } else {
        mutateUploadFile({
          file: first,
          callback: (fileUrl: string) => {
            setValue("file", fileUrl);
          },
        });
      }
    }
  };

  const handleDeleteFile = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("file");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    const fileUrl = getValues("file");
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

  const addCertification = async (payload: ICertification) => {
    const res = await serviceCertifications.addCertifications(payload);
    return res;
  };

  const {
    mutate: mutateAddCertification,
    isPending: isPendingMutateAddCertification,
    isSuccess: isSuccessMutateAddCertification,
  } = useMutation({
    mutationFn: addCertification,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Certificate added successfully",
      });
      reset();
    },
  });

  const handleAddCertification = (data: ICertification) =>
    mutateAddCertification(data);

  return {
    control,
    errors,
    reset,
    handleSubmitFormCertification,
    handleAddCertification,
    isPendingMutateAddCertification,
    isSuccessMutateAddCertification,
    handleUploadFile,
    isPendingMutateUploadFile,
    watch,
    preview,
    handleDeleteFile,
    isPendingMutateDeleteFile,
    handleOnClose,
  };
};

export default useAddCertificationModal;
