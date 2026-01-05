import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn } from "next-auth/react";

import { ILogin } from "@/types/Auth";
import { ToasterContext } from "@/contexts/ToasterContext";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your username"),
  password: yup.string().required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toogleVisibility = () => setIsVisible(!isVisible);
  const { setToaster } = useContext(ToasterContext);
  const callbackUrl: string = (router.query.callbackUrl as string) || "/admin";

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result?.status === 401) {
      throw new Error("Invalid username or password incorrect");
    }
  };

  const { isPending: isPendingLogin, mutate: mutateLogin } = useMutation({
    mutationFn: loginService,
    onError(error) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data?.message ||
          error.response?.data?.error ||
          JSON.stringify(error.response?.data)
        : String(error);

      // setToaster({ type: "error", message: error.message });
      setError("root", { message: msg });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Login Success" });
      router.push(callbackUrl);
      reset();
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toogleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export { useLogin };
