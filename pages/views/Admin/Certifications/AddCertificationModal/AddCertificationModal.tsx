import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddCertificationModal from "@/views/Admin/Certification/AddServiceModal/useAddCertificationModal";
import InputDocs from "@/components/ui/InputDocs";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchCertification: () => void;
  onOpenChange: () => void;
}

const AddCertificationModal = (props: PropTypes) => {
  const {
    control,
    errors,
    handleOnClose,
    handleSubmitFormCertification,
    handleAddCertification,
    isPendingMutateAddCertification,
    isSuccessMutateAddCertification,
    preview,
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useAddCertificationModal();
  const { isOpen, onClose, refetchCertification, onOpenChange } = props;

  useEffect(() => {
    if (isSuccessMutateAddCertification) {
      onClose();
      refetchCertification();
    }
  }, [isSuccessMutateAddCertification]);
  const disabledSubmit = isPendingMutateAddCertification;

  return (
    <Modal
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormCertification(handleAddCertification)}>
        <ModalContent className="m-4">
          <ModalHeader> Add Certification </ModalHeader>
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
                    label="Title"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Year"
                    variant="bordered"
                    type="number"
                    isInvalid={errors.year !== undefined}
                    errorMessage={errors.year?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Status"
                    variant="bordered"
                    className="mb-2"
                    isInvalid={errors.status !== undefined}
                    errorMessage={errors.status?.message}
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys as Set<string>).join("");
                      field.onChange(selected);
                    }}
                  >
                    <SelectItem key="true">true</SelectItem>
                  </Select>
                )}
              />
              <p className="text-sm font-bold">File</p>
              <Controller
                name="file"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputDocs
                    {...field}
                    onUpload={(files) => handleUploadFile(files, onChange)}
                    onDelete={() => handleDeleteFile(onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.file !== undefined}
                    errorMessage={errors.file?.message}
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
              {isPendingMutateAddCertification ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Certification"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddCertificationModal;
