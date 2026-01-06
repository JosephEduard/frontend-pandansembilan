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
  fullName: yup.string().required("Mohon masukkan nama lengkap Anda"),
  username: yup.string().required("Mohon masukkan nama pengguna Anda"),
  email: yup
    .string()
    .matches(/@/, "Email harus mengandung karakter @")
    .email("Mohon masukkan email yang valid")
    .required("Mohon masukkan email Anda"),
  password: yup
    .string()
    .min(8, "Kata sandi harus terdiri dari minimal 8 karakter")
    .matches(/[A-Z]/, "Kata sandi harus mengandung minimal 1 huruf kapital")
    .matches(/\d/, "Kata sandi harus mengandung minimal 1 angka")
    .required("Mohon masukkan kata sandi Anda"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Kata sandi tidak cocok")
    .required("Mohon masukkan konfirmasi kata sandi Anda"),
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
      setToaster({ type: "success", message: "Daftar berhasil" });
      router.push("/auth/admin/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  // Check password against breach datasets (HIBP) before submitting
  const isPasswordPwned = async (password: string): Promise<number> => {
    try {
      const encoder = new TextEncoder();
      const digest = await crypto.subtle.digest(
        "SHA-1",
        encoder.encode(password),
      );
      const hex = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();

      const prefix = hex.slice(0, 5);
      const suffix = hex.slice(5);
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);

      if (!res.ok) return 0;
      const text = await res.text();
      const line = text.split("\n").find((l) => l.startsWith(suffix));

      if (!line) return 0;
      const count = parseInt(line.split(":")[1], 10);

      return isNaN(count) ? 0 : count;
    } catch {
      // On network/crypto error, don't block registration
      return 0;
    }
  };

  // Override to add breach check while preserving external usage
  const handleRegisterWithBreachCheck = async (data: IRegister) => {
    const count = await isPasswordPwned(data.password);

    if (count > 0) {
      setError("password", {
        message:
          "Kata sandi ini teridentifikasi dalam kebocoran data. Gunakan kata sandi lain.",
      });

      return;
    }
    mutateRegister(data);
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    handleRegisterWithBreachCheck,
    isPendingRegister,
    errors,
  };
};

export { useRegister };
