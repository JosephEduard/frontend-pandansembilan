import Image from "next/image";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";

import { useLogin } from "@/views/Admin/Login/useLogin";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    control,
    errors,
    handleLogin,
    handleSubmit,
    isPendingLogin,
    isVisible,
    toogleVisibility,
  } = useLogin();

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
          <h2 className="text-danger mb-4 text-center text-2xl font-bold">
            Admin Login
          </h2>
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
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              control={control}
              name="identifier"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errors.identifier?.message}
                  isInvalid={errors.identifier !== undefined}
                  label="Username"
                  type="text"
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
                        onClick={toogleVisibility}
                        type="button"
                      >
                        {isVisible ? (
                          <FaEye className="text-default-400 pointer-events-none text-xl" />
                        ) : (
                          <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                        )}
                      </button>
                    }
                    errorMessage={errors.password?.message}
                    isInvalid={errors.password !== undefined}
                    label="Password"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                  />
                );
              }}
            />

            <Button color="danger" size="lg" type="submit">
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
