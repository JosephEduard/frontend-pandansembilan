import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import useAddServiceModal from "@/views/Admin/Service/AddServiceModal/useAddServiceModal";
import InputFile from "@/components/ui/InputFile";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchService: () => void;
  onOpenChange: () => void;
}

const AddServiceModal = (props: PropTypes) => {
  const {
    control,
    errors,
    handleAddService,
    handleDeleteBanner,
    handleOnClose,
    handleSubmitFormService,
    handleUploadBanner,
    isPendingMutateAddService,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    isSuccessMutateAddService,
    preview,
  } = useAddServiceModal();
  const { isOpen, onClose, onOpenChange, refetchService } = props;

  useEffect(() => {
    if (isSuccessMutateAddService) {
      onClose();
      refetchService();
    }
  }, [isSuccessMutateAddService]);

  const disabledSubmit =
    isPendingMutateAddService ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormService(handleAddService)}>
        <ModalContent className="m-4">
          <ModalHeader> Add Service </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    className="mb-2"
                    errorMessage={errors.name?.message}
                    isInvalid={errors.name !== undefined}
                    label="Name"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="mb-2"
                    errorMessage={errors.description?.message}
                    isInvalid={errors.description !== undefined}
                    label="Description"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
              <p className="text-sm font-bold">Banner</p>
              <Controller
                control={control}
                name="banner"
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    errorMessage={errors.banner?.message}
                    isDeleting={isPendingMutateDeleteFile}
                    isDropable
                    isInvalid={errors.banner !== undefined}
                    isUploading={isPendingMutateUploadFile}
                    onDelete={() => handleDeleteBanner(onChange)}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              disabled={disabledSubmit}
              onPress={() => handleOnClose(onClose)}
              variant="flat"
            >
              Cancel
            </Button>
            <Button color="danger" disabled={disabledSubmit} type="submit">
              {isPendingMutateAddService ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Tambah Service"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddServiceModal;
