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

import useImageTab from "@/views/Admin/DetailNews/ImageTab/useImageTab";
import { INews } from "@/types/News";
import InputFile from "@/components/ui/InputFile";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: INews) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
  const { currentImage, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    controlUpdateImage,
    errorsUpdateImage,
    handleDeleteImage,
    handleSubmitUpdateImage,

    handleUploadImage,

    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,
    resetUpdateImage,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Image News</h1>
        <p className="text-small text-default-400 w-full">
          Atur Image News ini.
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-4">
            <p className="text-default-700 text-sm font-medium">
              Image saat ini
            </p>
            <Skeleton
              className="aspect-square rounded-lg"
              isLoaded={!!currentImage}
            >
              <Image alt="image" className="relative" fill src={currentImage} />
            </Skeleton>
          </div>
          <Controller
            control={controlUpdateImage}
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                errorMessage={errorsUpdateImage.image?.message}
                isDeleting={isPendingMutateDeleteFile}
                isDropable
                isInvalid={errorsUpdateImage.image !== undefined}
                isUploading={isPendingMutateUploadFile}
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload Image Baru
                  </p>
                }
                onDelete={() => handleDeleteImage(onChange)}
                onUpload={(files) => handleUploadImage(files, onChange)}
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

export default ImageTab;
