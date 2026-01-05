import { Button, Image } from "@heroui/react";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          alt="logo"
          height={250}
          src="/images/general/logo2.svg"
          width={250}
        />
        <Image
          alt="success"
          className="-mt-40 mb-0 w-full sm:-mt-30 md:-mt-20 lg:-mt-30 lg:w-full"
          height={300}
          src="/images/general/success.png"
          width={1080}
        />
      </div>
      <div className="-mt-20 flex flex-col items-center gap-2 text-center">
        <h1 className="text-danger-500 text-3xl font-bold">
          Buat Akun Admin Berhasil!
        </h1>
        <Button
          className="mt-4 w-fit"
          color="danger"
          onPress={() => router.push("/auth/admin/login")}
          variant="bordered"
        >
          Login Disini
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
