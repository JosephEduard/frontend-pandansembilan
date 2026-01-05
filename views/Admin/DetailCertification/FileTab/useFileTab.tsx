import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateFile = yup.object().shape({
  file: yup
    .mixed<FileList | string>()
    .required("Mohon masukkan File Certificate ini"),
});

const useFileTab = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateFile,
    handleSubmit: handleSubmitUpdateFile,
    formState: { errors: errorsUpdateFile },
    reset: resetUpdateFile,
    watch: watchUpdateFile,
    getValues: getValuesUpdateFile,
    setValue: setValueUpdateFile,
  } = useForm({
    resolver: yupResolver(schemaUpdateFile),
  });

  const preview = watchUpdateFile("file");

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
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
