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
import { MdDelete } from "react-icons/md";

import useImagesTab from "@/views/Admin/DetailProject/ImagesTab/useImagesTab";
import { IProject } from "@/types/Project";
import InputFile from "@/components/ui/InputFile";

interface PropTypes {
  currentImages?: string;
  onUpdate: (data: IProject) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImagesTab = (props: PropTypes) => {
  const { currentImages, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    controlUpdateImages,
    deletingId,
    errorsUpdateImages,
    handleDeleteImage,
    handleDeleteImages,
    handleSubmitUpdateImages,
    handleUploadImages,
    isPendingAddProjectImage,
    isPendingDeleteProjectImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateUploadMultipleFiles,

    preview,
    projectImages,
    refetchProjectImages,
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
            <Skeleton className="rounded-lg" isLoaded>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {(projectImages || []).map((img) => (
                  <button
                    className="relative aspect-square overflow-hidden rounded-lg border"
                    key={img._id ?? img.image}
                    onClick={() => {
                      setSelectedImage(
                        typeof img.image === "string" ? img.image : null,
                      );
                      previewModal.onOpen();
                    }}
                    type="button"
                  >
                    <Image
                      alt="image"
                      className="object-cover"
                      fill
                      src={`${img.image}`}
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
                        aria-label="Delete image"
                        color="danger"
                        isDisabled={
                          isPendingDeleteProjectImage && deletingId === img._id
                        }
                        isIconOnly
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(img._id as string);
                        }}
                        size="sm"
                        variant="flat"
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
              allowMultiple
              isDropable
              isUploading={
                isPendingMutateUploadFile ||
                isPendingMutateUploadMultipleFiles ||
                isPendingAddProjectImage
              }
              label={
                <p className="text-default-700 mb-2 text-sm font-medium">
                  Upload Images Baru
                </p>
              }
              name="project-images"
              onUpload={(files) => handleUploadImages(files)}
              preview=""
            />
          </div>
        </div>
      </CardBody>
      <Modal
        isOpen={previewModal.isOpen}
        onClose={() => {
          setSelectedImage(null);
          previewModal.onClose();
        }}
        onOpenChange={previewModal.onOpenChange}
        placement="center"
        scrollBehavior="inside"
        size="lg"
      >
        <ModalContent className="m-4">
          <ModalBody>
            <div className="relative mx-auto h-[70vh] w-[85vw] max-w-5xl">
              {selectedImage && (
                <Image
                  alt="preview"
                  className="object-contain"
                  fill
                  sizes="(max-width: 768px) 85vw, 1024px"
                  src={selectedImage}
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
