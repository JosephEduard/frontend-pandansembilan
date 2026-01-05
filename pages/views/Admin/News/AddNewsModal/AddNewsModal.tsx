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

import useAddNewsModal from "@/views/Admin/News/AddNewsModal/useAddNewsModal";
import InputFile from "@/components/ui/InputFile";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchNews: () => void;
  onOpenChange: () => void;
}

const AddNewsModal = (props: PropTypes) => {
  const {
    control,
    errors,
    handleAddNews,
    handleDeleteBanner,
    handleOnClose,
    handleSubmitFormNews,
    handleUploadBanner,
    isPendingMutateAddNews,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    isSuccessMutateAddNews,
    preview,
  } = useAddNewsModal();
  const { isOpen, onClose, onOpenChange, refetchNews } = props;

  useEffect(() => {
    if (isSuccessMutateAddNews) {
      onClose();
      refetchNews();
    }
  }, [isSuccessMutateAddNews]);
  const disabledSubmit =
    isPendingMutateAddNews ||
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
      <form onSubmit={handleSubmitFormNews(handleAddNews)}>
        <ModalContent className="m-4">
          <ModalHeader> Add News </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    className="mb-2"
                    errorMessage={errors.title?.message}
                    isInvalid={errors.title !== undefined}
                    label=" News Title"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
              <Controller
                control={control}
                name="text"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="mb-2"
                    errorMessage={errors.text?.message}
                    isInvalid={errors.text !== undefined}
                    label="Text"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    className="mb-2"
                    errorMessage={errors.date?.message}
                    isInvalid={errors.date !== undefined}
                    label="Date"
                    type="date"
                    variant="bordered"
                  />
                )}
              />
              <p className="text-sm font-bold">Image</p>
              <Controller
                control={control}
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    errorMessage={errors.image?.message}
                    isDeleting={isPendingMutateDeleteFile}
                    isDropable
                    isInvalid={errors.image !== undefined}
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
              {isPendingMutateAddNews ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Tambah News"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddNewsModal;
