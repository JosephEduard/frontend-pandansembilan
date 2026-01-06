import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

interface ErrorResponseData {
  data: {
    name: string;
  };
}

const onErrorHander = (error: Error) => {
  const { response } = error as AxiosError;
  const res = response?.data as ErrorResponseData;

  if (
    (response && (response.status === 401 || response.status === 403)) ||
    res?.data?.name === "TokenExpiredError"
  ) {
    signOut({ callbackUrl: "/auth/admin/login" });
  }
};

export { onErrorHander };
