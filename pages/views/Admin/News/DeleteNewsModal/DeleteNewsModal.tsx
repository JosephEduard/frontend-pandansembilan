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

import useDeleteNewsModal from "@/views/Admin/News/DeleteNewsModal/useDeleteNewsModal";

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
    isPendingMutateDeleteNews,
    isSuccessMutateDeleteNews,
    mutateDeleteNews,
  } = useDeleteNewsModal();

  useEffect(() => {
    if (isSuccessMutateDeleteNews) {
      onClose();
      refetchNews();
    }
  }, [isSuccessMutateDeleteNews]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader> Hapus Berita </ModalHeader>
        <ModalBody>
          <p className="text-medium font-bold">
            Apakah Anda yakin ingin menghapus berita ini?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            disabled={isPendingMutateDeleteNews}
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            variant="flat"
          >
            Batal
          </Button>
          <Button
            color="danger"
            disabled={isPendingMutateDeleteNews}
            onPress={() => mutateDeleteNews(selectedId)}
            type="submit"
          >
            {isPendingMutateDeleteNews ? (
              <Spinner color="white" size="sm" />
            ) : (
              "Hapus"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteNewsModal;
