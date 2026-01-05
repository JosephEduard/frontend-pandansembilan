import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import useMediaHandling from "@/hooks/useMediaHandling";

const schemaUpdateImage = yup.object().shape({
  image: yup.mixed<FileList | string>().required("Please upload News image"),
});

const useImageTab = () => {
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    mutateUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateImage,
    formState: { errors: errorsUpdateImage },
    getValues: getValuesUpdateImage,
    handleSubmit: handleSubmitUpdateImage,
    reset: resetUpdateImage,
    setValue: setValueUpdateImage,
    watch: watchUpdateImage,
  } = useForm({
    resolver: yupResolver(schemaUpdateImage),
  });

  const preview = watchUpdateImage("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValueUpdateImage("image", fileUrl);
        },
      });
    }
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateImage("image");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  return {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    preview,

    controlUpdateImage,
    handleSubmitUpdateImage,
    errorsUpdateImage,
    resetUpdateImage,
  };
};

export default useImageTab;
