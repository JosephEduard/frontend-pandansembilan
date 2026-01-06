import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useContext } from "react";

import useMediaHandling from "@/hooks/useMediaHandling";
import { ToasterContext } from "@/contexts/ToasterContext";

const schemaUpdateFile = yup.object().shape({
  file: yup
    .mixed<FileList | string>()
    .required("Mohon masukkan File Sertifikat ini")
    .test("fileSize", "Ukuran file maksimal 5MB.", (value) => {
      if (typeof value === "string") return true;
      if (!value || (value as FileList).length === 0) return true;
      const files = Array.from(value as FileList);
      const MAX = 5 * 1024 * 1024;

      return files.every((f) => (f?.size ?? 0) <= MAX);
    }),
});

const useFileTab = () => {
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    mutateUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateFile,
    formState: { errors: errorsUpdateFile },
    getValues: getValuesUpdateFile,
    handleSubmit: handleSubmitUpdateFile,
    reset: resetUpdateFile,
    setValue: setValueUpdateFile,
    watch: watchUpdateFile,
  } = useForm({
    resolver: yupResolver(schemaUpdateFile),
  });
  const { setToaster } = useContext(ToasterContext);
  const preview = watchUpdateFile("file");

  const handleUploadFile = (
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
          setValueUpdateFile("file", fileUrl);
        },
      });
    }
  };

  const handleDeleteFile = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateFile("file");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  return {
    handleDeleteFile,
    handleUploadFile,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    preview,

    controlUpdateFile,
    handleSubmitUpdateFile,
    errorsUpdateFile,
    resetUpdateFile,
  };
};

export default useFileTab;
