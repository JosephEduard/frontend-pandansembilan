import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";

import authServices from "@/services/auth";
import { IRegister } from "@/types/Auth";
import { ToasterContext } from "@/contexts/ToasterContext";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your full name"),
  username: yup.string().required("Please input your username"),
  email: yup
    .string()
    .email("Please input a valid email")
    .required("Please input your email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password not match")
    .required("Please input your password"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { setToaster } = useContext(ToasterContext);

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);

    return result;
  };

  const { isPending: isPendingRegister, mutate: mutateRegister } = useMutation({
    mutationFn: registerService,
    onError(error) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data?.message ||
          error.response?.data?.error ||
          JSON.stringify(error.response?.data)
        : String(error);

      setError("root", { message: msg });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Register Success" });
      router.push("/auth/admin/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export { useRegister };
