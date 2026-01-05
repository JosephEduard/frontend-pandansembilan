import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Mohon masukkan nama Certificate ini"),
  description: yup
    .string()
    .required("Mohon masukkan deskripsi Certificate ini"),
  year: yup.string().required("Please enter project year"),
  status: yup.string().optional(),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    handleSubmit: handleSubmitUpdateInfo,
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useInfoTab;
