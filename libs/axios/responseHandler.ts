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
    if (
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin")
    ) {
      signOut({ callbackUrl: "/auth/admin/login" });
    } else {
      // Clear session silently outside admin routes
      signOut({ redirect: false });
    }
  }
};

export { onErrorHander };
