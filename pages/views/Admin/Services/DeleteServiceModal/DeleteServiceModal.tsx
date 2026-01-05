import useDeleteServiceModal from "@/views/Admin/Service/DeleteServiceModal/useDeleteServiceModal";
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
import { set } from "react-hook-form";

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
    mutateDeleteService,
    isPendingMutateDeleteService,
    isSuccessMutateDeleteService,
  } = useDeleteServiceModal();

  useEffect(() => {
    if (isSuccessMutateDeleteService) {
      onClose();
      refetchService();
    }
  }, [isSuccessMutateDeleteService]);

  return (
    <Modal
      onClose={onClose}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
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
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteService}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteService}
            onPress={() => mutateDeleteService(selectedId)}
          >
            {isPendingMutateDeleteService ? (
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
export default DeleteServiceModal;
