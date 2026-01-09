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
    handleAddCertification,
    handleDeleteFile,
    handleOnClose,
    handleSubmitFormCertification,
    handleUploadFile,
    isPendingMutateAddCertification,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    isSuccessMutateAddCertification,
    preview,
  } = useAddCertificationModal();
  const { isOpen, onClose, onOpenChange, refetchCertification } = props;

  useEffect(() => {
    if (isSuccessMutateAddCertification) {
      onClose();
      refetchCertification();
    }
  }, [isSuccessMutateAddCertification]);
  const disabledSubmit = isPendingMutateAddCertification;

  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormCertification(handleAddCertification)}>
        <ModalContent className="m-4">
          <ModalHeader> Tambah Sertifikat </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Informasi</p>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mb-2"
                    errorMessage={errors.title?.message}
                    isInvalid={errors.title !== undefined}
                    label="Judul"
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
                    label="Deskripsi"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
              <Controller
                control={control}
                name="year"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mb-2"
                    errorMessage={errors.year?.message}
                    isInvalid={errors.year !== undefined}
                    label="Tahun"
                    type="number"
                    variant="bordered"
                  />
                )}
              />
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    className="mb-2"
                    errorMessage={errors.status?.message}
                    isInvalid={errors.status !== undefined}
                    label="Status"
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys as Set<string>).join("");

                      field.onChange(selected);
                    }}
                    selectedKeys={field.value ? [field.value] : []}
                    variant="bordered"
                  >
                    <SelectItem key="true">Valid</SelectItem>
                    <SelectItem key="false">Tidak Valid</SelectItem>
                  </Select>
                )}
              />
              <p className="text-sm font-bold">File</p>
              <Controller
                control={control}
                name="file"
                render={({ field: { onChange, value, ...field } }) => (
                  <InputDocs
                    {...field}
                    errorMessage={errors.file?.message}
                    isDeleting={isPendingMutateDeleteFile}
                    isDropable
                    isInvalid={errors.file !== undefined}
                    isUploading={isPendingMutateUploadFile}
                    onDelete={() => handleDeleteFile(onChange)}
                    onUpload={(files) => handleUploadFile(files, onChange)}
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
              Batal
            </Button>
            <Button color="danger" disabled={disabledSubmit} type="submit">
              {isPendingMutateAddCertification ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Tambah Sertifikat"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCertificationModal;
