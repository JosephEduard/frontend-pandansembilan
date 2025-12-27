import Image from "next/image";
import { Button, button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-1/2 flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/images/general/logo2.svg"
          alt="logo"
          width={900}
          height={900}
        />
        <Image
          src="/images/general/logotext.svg"
          alt="logos"
          className="-mt-16 sm:-mt-22 md:-mt-20 lg:-mt-24 lg:w-full"
          width={420}
          height={420}
        />
      </div>
      <Card className="w-80 md:w-100 lg:w-100">
        <CardBody className="p-4 md:p-7 lg:p-7">
          <h2 className="text-primary text-xl font-bold">Admin Register</h2>
          <p className="text-small mb-4">
            Sudah punya akses sebagai admin?&nbsp;
            <Link
              href="/auth/admin/login"
              className="text-primary-400 font-semibold"
            >
              Login di sini
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
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Fullname"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.fullName !== undefined}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  variant="bordered"
                  autoComplete="off"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type={visiblePassword.password ? "text" : "password"}
                    label="Password"
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword("password")}
                      >
                        {visiblePassword.password ? (
                          <FaEye className="text-default-400 pointer-events-none text-xl" />
                        ) : (
                          <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                        )}
                      </button>
                    }
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                  />
                );
              }}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  variant="bordered"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="text-default-400 pointer-events-none text-xl" />
                      ) : (
                        <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                      )}
                    </button>
                  }
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
            <Button color="primary" size="lg" type="submit">
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
