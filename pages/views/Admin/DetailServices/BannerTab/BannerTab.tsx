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

import useBannerTab from "@/views/Admin/DetailService/BannerTab/useBannerTab";
import { IService } from "@/types/Service";
import InputFile from "@/components/ui/InputFile";

interface PropTypes {
  currentBanner: string;
  onUpdate: (data: IService) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const BannerTab = (props: PropTypes) => {
  const { currentBanner, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    controlUpdateBanner,
    errorsUpdateBanner,
    handleDeleteBanner,
    handleSubmitUpdateBanner,

    handleUploadBanner,

    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,
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
              className="aspect-square rounded-lg"
              isLoaded={!!currentBanner}
            >
              <Image
                alt="banner"
                className="relative"
                fill
                src={currentBanner}
              />
            </Skeleton>
          </div>
          <Controller
            control={controlUpdateBanner}
            name="banner"
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                errorMessage={errorsUpdateBanner.banner?.message}
                isDeleting={isPendingMutateDeleteFile}
                isDropable
                isInvalid={errorsUpdateBanner.banner !== undefined}
                isUploading={isPendingMutateUploadFile}
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload Banner Baru
                  </p>
                }
                onDelete={() => handleDeleteBanner(onChange)}
                onUpload={(files) => handleUploadBanner(files, onChange)}
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            className="disabled:bg-default-500 mt-2"
            color="danger"
            disabled={isPendingMutateUploadFile || isPendingUpdate}
            type="submit"
          >
            {isPendingUpdate ? (
              <Spinner color="white" size="sm" />
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
