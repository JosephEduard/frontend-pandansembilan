import { Button, Image } from "@heroui/react";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo2.svg"
          alt="logo"
          width={250}
          height={250}
        />
        <Image
          src="/images/general/success.svg"
          alt="success"
          className="-mt-16 mb-0 sm:-mt-22 md:-mt-20 lg:-mt-30 lg:w-full"
          width={300}
          height={300}
        />
      </div>
      <div className="-mt-20 flex flex-col items-center gap-2 text-center">
        <h1 className="text-danger-500 text-3xl font-bold">
          Buat Akun Admin Berhasil!
        </h1>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="danger"
          onPress={() => router.push("/auth/admin/login")}
        >
          Login Disini
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
