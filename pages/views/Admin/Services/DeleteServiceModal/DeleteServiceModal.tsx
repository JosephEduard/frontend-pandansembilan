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

import useDeleteServiceModal from "@/views/Admin/Service/DeleteServiceModal/useDeleteServiceModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  refetchService: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteServiceModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchService,
    selectedId,
    setSelectedId,
  } = props;

  const {
    isPendingMutateDeleteService,
    isSuccessMutateDeleteService,
    mutateDeleteService,
  } = useDeleteServiceModal();

  useEffect(() => {
    if (isSuccessMutateDeleteService) {
      onClose();
      refetchService();
    }
  }, [isSuccessMutateDeleteService]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader> Delete Service </ModalHeader>
        <ModalBody>
          <p className="text-medium font-bold">
            Apakah Anda yakin ingin menghapus service ini?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            disabled={isPendingMutateDeleteService}
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
            disabled={isPendingMutateDeleteService}
            onPress={() => mutateDeleteService(selectedId)}
            type="submit"
          >
            {isPendingMutateDeleteService ? (
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

export default DeleteServiceModal;
