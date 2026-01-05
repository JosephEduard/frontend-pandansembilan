import InputFile from "@/components/ui/InputFile";
import useAddNewsModal from "@/views/Admin/News/AddNewsModal/useAddNewsModal";
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
    handleOnClose,
    handleSubmitFormNews,
    handleAddNews,
    isPendingMutateAddNews,
    isSuccessMutateAddNews,
    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
  } = useAddNewsModal();
  const { isOpen, onClose, refetchNews, onOpenChange } = props;

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
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
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
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label=" News Title"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Text"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.text !== undefined}
                    errorMessage={errors.text?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Date"
                    variant="bordered"
                    type="date"
                    isInvalid={errors.date !== undefined}
                    errorMessage={errors.date?.message}
                    className="mb-2"
                  />
                )}
              />
              <p className="text-sm font-bold">Image</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    onDelete={() => handleDeleteBanner(onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                    isDropable
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="danger" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddNews ? (
                <Spinner size="sm" color="white" />
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
