import useMediaHandling from "@/hooks/useMediaHandling";
import { IService } from "@/types/Service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateBanner = yup.object().shape({
  banner: yup
    .mixed<FileList | string>()
    .required("Mohon masukkan Banner Service ini"),
});

const useBannerTab = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateBanner,
    handleSubmit: handleSubmitUpdateBanner,
    formState: { errors: errorsUpdateBanner },
    reset: resetUpdateBanner,
    watch: watchUpdateBanner,
    getValues: getValuesUpdateBanner,
    setValue: setValueUpdateBanner,
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
