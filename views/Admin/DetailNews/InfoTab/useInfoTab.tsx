import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Please enter news title"),
  text: yup.string().required("Please enter news description"),
  // Accept string from input, ensure it's a valid date
  date: yup
    .string()
    .required("Please enter news date")
    .test("is-valid-date", "Invalid date", (value) => {
      if (!value) return false;
      const d = new Date(value);

      return !isNaN(d.getTime());
    }),
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
