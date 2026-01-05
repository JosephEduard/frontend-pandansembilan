import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import useMediaHandling from "@/hooks/useMediaHandling";

const schemaUpdateBanner = yup.object().shape({
  banner: yup
    .mixed<FileList | string>()
    .required("Mohon masukkan Banner Service ini"),
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

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
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
