import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useContext } from "react";

import useMediaHandling from "@/hooks/useMediaHandling";
import { ToasterContext } from "@/contexts/ToasterContext";

const schemaUpdateBanner = yup.object().shape({
  banner: yup
    .mixed<FileList | string>()
    .required("Mohon masukkan banner layanan ini")
    .test("fileSize", "Ukuran file maksimal 5MB.", (value) => {
      if (typeof value === "string") return true; // already uploaded, skip size check
      if (!value || (value as FileList).length === 0) return true; // let required handle empty
      const files = Array.from(value as FileList);
      const MAX = 5 * 1024 * 1024;

      return files.every((f) => (f?.size ?? 0) <= MAX);
    }),
});

const useBannerTab = () => {
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    mutateUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateBanner,
    formState: { errors: errorsUpdateBanner },
    getValues: getValuesUpdateBanner,
    handleSubmit: handleSubmitUpdateBanner,
    reset: resetUpdateBanner,
    setValue: setValueUpdateBanner,
    watch: watchUpdateBanner,
  } = useForm({
    resolver: yupResolver(schemaUpdateBanner),
  });

  const preview = watchUpdateBanner("banner");
  const { setToaster } = useContext(ToasterContext);

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
          setValueUpdateBanner("banner", fileUrl);
        },
      });
    }
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateBanner("banner");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  return {
    handleDeleteBanner,
    handleUploadBanner,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    preview,

    controlUpdateBanner,
    handleSubmitUpdateBanner,
    errorsUpdateBanner,
    resetUpdateBanner,
  };
};

export default useBannerTab;
