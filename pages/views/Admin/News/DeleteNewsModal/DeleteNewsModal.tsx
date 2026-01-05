import useDeleteNewsModal from "@/views/Admin/News/DeleteNewsModal/useDeleteNewsModal";
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
  refetchNews: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteNewsModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchNews,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteNews,
    isPendingMutateDeleteNews,
    isSuccessMutateDeleteNews,
  } = useDeleteNewsModal();

  useEffect(() => {
    if (isSuccessMutateDeleteNews) {
      onClose();
      refetchNews();
    }
  }, [isSuccessMutateDeleteNews]);
  return (
    <Modal
      onClose={onClose}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader> Delete News </ModalHeader>
        <ModalBody>
          <p className="text-medium font-bold">
            Apakah Anda yakin ingin menghapus news ini?
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
            disabled={isPendingMutateDeleteNews}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteNews}
            onPress={() => mutateDeleteNews(selectedId)}
          >
            {isPendingMutateDeleteNews ? (
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
export default DeleteNewsModal;
