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

import useDeleteProjectModal from "@/views/Admin/Project/DeleteProjectModal/useDeleteProjectModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  refetchProject: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteProjectModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchProject,
    selectedId,
    setSelectedId,
  } = props;

  const {
    isPendingMutateDeleteProject,
    isSuccessMutateDeleteProject,
    mutateDeleteProject,
  } = useDeleteProjectModal();

  useEffect(() => {
    if (isSuccessMutateDeleteProject) {
      onClose();
      refetchProject();
    }
  }, [isSuccessMutateDeleteProject]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader> Hapus Proyek </ModalHeader>
        <ModalBody>
          <p className="text-medium font-bold">
            Apakah Anda yakin ingin menghapus proyek ini?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            disabled={isPendingMutateDeleteProject}
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
            disabled={isPendingMutateDeleteProject}
            onPress={() => mutateDeleteProject(selectedId)}
            type="submit"
          >
            {isPendingMutateDeleteProject ? (
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

export default DeleteProjectModal;
