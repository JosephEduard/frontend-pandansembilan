import useDeleteCertificationModal from "@/views/Admin/Certification/DeleteServiceModal/useDeleteCertificationModal";
import useDeleteProjectModal from "@/views/Admin/Project/DeleteProjectModal/useDeleteProjectModal";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  refetchCertification: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteCertificationModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchCertification,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteCertification,
    isPendingMutateDeleteCertification,
    isSuccessMutateDeleteCertification,
  } = useDeleteCertificationModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCertification) {
      onClose();
      refetchCertification();
    }
  }, [isSuccessMutateDeleteCertification]);
  return (
    <Modal
      onClose={onClose}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader> Delete Certification </ModalHeader>
        <ModalBody>
          <p className="text-medium font-bold">
            Apakah Anda yakin ingin menghapus certificate ini?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteCertification}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteCertification}
            onPress={() => mutateDeleteCertification(selectedId)}
          >
            {isPendingMutateDeleteCertification ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteCertificationModal;
