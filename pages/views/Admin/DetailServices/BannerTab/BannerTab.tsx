import InputFile from "@/components/ui/InputFile";
import { IService } from "@/types/Service";
import useBannerTab from "@/views/Admin/DetailService/BannerTab/useBannerTab";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropTypes {
  currentBanner: string;
  onUpdate: (data: IService) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const BannerTab = (props: PropTypes) => {
  const { currentBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteBanner,
    handleUploadBanner,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    preview,

    controlUpdateBanner,
    handleSubmitUpdateBanner,
    errorsUpdateBanner,
    resetUpdateBanner,
  } = useBannerTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateBanner();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Service</h1>
        <p className="text-small text-default-400 w-full">
          Atur Banner Service ini.
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateBanner(onUpdate)}
        >
          <div className="flex flex-col gap-4">
            <p className="text-default-700 text-sm font-medium">
              Banner saat ini
            </p>
            <Skeleton
              isLoaded={!!currentBanner}
              className="aspect-square rounded-lg"
            >
              <Image
                src={currentBanner}
                alt="banner"
                fill
                className="relative"
              />
            </Skeleton>
          </div>
          <Controller
            name="banner"
            control={controlUpdateBanner}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadBanner(files, onChange)}
                onDelete={() => handleDeleteBanner(onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateBanner.banner !== undefined}
                errorMessage={errorsUpdateBanner.banner?.message}
                isDropable
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload Banner Baru
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            color="danger"
            className="disabled:bg-default-500 mt-2"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default BannerTab;
