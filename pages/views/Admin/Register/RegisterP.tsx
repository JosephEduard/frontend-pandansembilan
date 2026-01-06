import Image from "next/image";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { useRegister } from "@/views/Admin/Register/useRegister";
import { cn } from "@/utils/cn";

const Register = () => {
  const {
    control,
    errors,
    handleRegister,
    handleSubmit,
    handleVisiblePassword,
    isPendingRegister,
    visiblePassword,
  } = useRegister();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-1/2 flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          alt="logo"
          height={900}
          src="/images/general/logo2.svg"
          width={900}
        />
        <Image
          alt="logos"
          className="-mt-16 sm:-mt-22 md:-mt-20 lg:-mt-24 lg:w-full"
          height={420}
          src="/images/general/logotext.svg"
          width={420}
        />
      </div>
      <Card className="w-80 md:w-100 lg:w-100">
        <CardBody className="p-4 md:p-7 lg:p-7">
          <h2 className="text-primary text-xl font-bold">Daftar Admin</h2>
          <p className="text-small mb-4">
            Sudah punya akses sebagai admin?&nbsp;
            <Link
              className="text-primary-400 font-semibold"
              href="/auth/admin/login"
            >
              Masuk di sini
            </Link>
          </p>
          {errors.root && (
            <p className="text-danger-600 mb-2 font-medium">
              {errors?.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex w-70 flex-col md:w-85 lg:w-85",
              Object.keys(errors).length > 0 ? "gap-3" : "gap-5",
            )}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              control={control}
              name="fullName"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errors.fullName?.message}
                  isInvalid={errors.fullName !== undefined}
                  label="Nama Lengkap"
                  type="text"
                  variant="bordered"
                />
              )}
            />
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errors.username?.message}
                  isInvalid={errors.username !== undefined}
                  label="Nama Pengguna"
                  type="text"
                  variant="bordered"
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  label="Email"
                  type="email"
                  variant="bordered"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    autoComplete="off"
                    endContent={
                      <button
                        className="focus:outline-none"
                        onClick={() => handleVisiblePassword("password")}
                        type="button"
                      >
                        {visiblePassword.password ? (
                          <FaEye className="text-default-400 pointer-events-none text-xl" />
                        ) : (
                          <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                        )}
                      </button>
                    }
                    errorMessage={errors.password?.message}
                    isInvalid={errors.password !== undefined}
                    label="Password"
                    type={visiblePassword.password ? "text" : "password"}
                    variant="bordered"
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                      type="button"
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="text-default-400 pointer-events-none text-xl" />
                      ) : (
                        <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                      )}
                    </button>
                  }
                  errorMessage={errors.confirmPassword?.message}
                  isInvalid={errors.confirmPassword !== undefined}
                  label="Konfirmasi Password"
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  variant="bordered"
                />
              )}
            />
            <Button color="primary" size="lg" type="submit">
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Daftar"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
