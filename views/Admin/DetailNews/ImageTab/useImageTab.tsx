import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useContext } from "react";

import useMediaHandling from "@/hooks/useMediaHandling";
import { ToasterContext } from "@/contexts/ToasterContext";

const schemaUpdateImage = yup.object().shape({
  image: yup
    .mixed<FileList | string>()
    .required("Mohon unggah gambar berita.")
    .test("fileSize", "Ukuran gambar maksimal 5MB.", (value) => {
      if (typeof value === "string") return true; // already uploaded, skip size check
      if (!value || (value as FileList).length === 0) return true; // let required handle empty
      const files = Array.from(value as FileList);
      const MAX = 5 * 1024 * 1024;

      return files.every((f) => (f?.size ?? 0) <= MAX);
    }),
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
  const { setToaster } = useContext(ToasterContext);

  const handleUploadImage = (
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
          message: "Ukuran gambar maksimal 5MB.",
        });
        onChange(undefined); // clear selection (optional)

        return;
      }
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
