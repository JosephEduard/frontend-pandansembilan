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

import useDeleteCertificationModal from "@/views/Admin/Certification/DeleteServiceModal/useDeleteCertificationModal";

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
    isPendingMutateDeleteCertification,
    isSuccessMutateDeleteCertification,
    mutateDeleteCertification,
  } = useDeleteCertificationModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCertification) {
      onClose();
      refetchCertification();
    }
  }, [isSuccessMutateDeleteCertification]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
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
            disabled={isPendingMutateDeleteCertification}
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            variant="flat"
          >
            Cancel
          </Button>
          <Button
            color="danger"
            disabled={isPendingMutateDeleteCertification}
            onPress={() => mutateDeleteCertification(selectedId)}
            type="submit"
          >
            {isPendingMutateDeleteCertification ? (
              <Spinner color="white" size="sm" />
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
