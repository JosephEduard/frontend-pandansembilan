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
    mutateDeleteProject,
    isPendingMutateDeleteProject,
    isSuccessMutateDeleteProject,
  } = useDeleteProjectModal();

  useEffect(() => {
    if (isSuccessMutateDeleteProject) {
      onClose();
      refetchProject();
    }
  }, [isSuccessMutateDeleteProject]);
  return (
    <Modal
      onClose={onClose}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader> Delete Project </ModalHeader>
        <ModalBody>
          <p className="text-medium font-bold">
            Apakah Anda yakin ingin menghapus project ini?
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
            disabled={isPendingMutateDeleteProject}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteProject}
            onPress={() => mutateDeleteProject(selectedId)}
          >
            {isPendingMutateDeleteProject ? (
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
export default DeleteProjectModal;
