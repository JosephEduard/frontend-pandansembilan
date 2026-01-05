import InputFile from "@/components/ui/InputFile";
import { IProject } from "@/types/Project";
import useImagesTab from "@/views/Admin/DetailProject/ImagesTab/useImagesTab";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { MdDelete } from "react-icons/md";

interface PropTypes {
  currentImages?: string;
  onUpdate: (data: IProject) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImagesTab = (props: PropTypes) => {
  const { currentImages, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteImages,
    handleUploadImages,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateUploadMultipleFiles,
    isPendingAddProjectImage,
    isPendingDeleteProjectImage,
    projectImages,
    refetchProjectImages,
    preview,
    handleDeleteImage,
    deletingId,

    controlUpdateImages,
    handleSubmitUpdateImages,
    errorsUpdateImages,
    resetUpdateImages,
  } = useImagesTab();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const previewModal = useDisclosure();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImages();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Images Project</h1>
        <p className="text-small text-default-400 w-full">
          Atur Images Project ini.
        </p>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">
              Project Images
            </p>
            <Skeleton isLoaded className="rounded-lg">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {(projectImages || []).map((img) => (
                  <button
                    key={img._id ?? img.image}
                    type="button"
                    onClick={() => {
                      setSelectedImage(
                        typeof img.image === "string" ? img.image : null,
                      );
                      previewModal.onOpen();
                    }}
                    className="relative aspect-square overflow-hidden rounded-lg border"
                  >
                    <Image
                      src={`${img.image}`}
                      alt="image"
                      fill
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0">
                      {isPendingDeleteProjectImage &&
                        deletingId === img._id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40">
                            <Spinner size="sm" />
                          </div>
                        )}
                    </div>
                    <div className="absolute top-2 right-2 z-[1]">
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="flat"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(img._id as string);
                        }}
                        isDisabled={
                          isPendingDeleteProjectImage && deletingId === img._id
                        }
                        aria-label="Delete image"
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </button>
                ))}
              </div>
            </Skeleton>
          </div>

          <div>
            <InputFile
              name="project-images"
              onUpload={(files) => handleUploadImages(files)}
              isUploading={
                isPendingMutateUploadFile ||
                isPendingMutateUploadMultipleFiles ||
                isPendingAddProjectImage
              }
              isDropable
              allowMultiple
              label={
                <p className="text-default-700 mb-2 text-sm font-medium">
                  Upload Images Baru
                </p>
              }
              preview=""
            />
          </div>
        </div>
      </CardBody>
      <Modal
        isOpen={previewModal.isOpen}
        onOpenChange={previewModal.onOpenChange}
        onClose={() => {
          setSelectedImage(null);
          previewModal.onClose();
        }}
        placement="center"
        scrollBehavior="inside"
        size="lg"
      >
        <ModalContent className="m-4">
          <ModalBody>
            <div className="relative mx-auto h-[70vh] w-[85vw] max-w-5xl">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 85vw, 1024px"
                />
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ImagesTab;
