import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Mohon masukkan nama proyek"),
  description: yup.string().required("Mohon masukkan deskripsi proyek"),
  address: yup.string().required("Mohon masukkan alamat proyek"),
  serviceId: yup.string().required("Mohon pilih layanan"),
  year: yup.string().required("Mohon masukkan tahun proyek"),
  status: yup.string().required("Mohon pilih status proyek"),
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
