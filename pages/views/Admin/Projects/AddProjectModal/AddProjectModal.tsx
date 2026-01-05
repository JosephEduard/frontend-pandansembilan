import useAddProjectModal from "@/views/Admin/Project/AddProjectModal/useAddProjectModal";
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
import serviceServices from "@/services/service";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchProject: () => void;
  onOpenChange: () => void;
}

const AddProjectModal = (props: PropTypes) => {
  const {
    control,
    errors,
    handleOnClose,
    handleSubmitFormProject,
    handleAddProject,
    isPendingMutateAddProject,
    isSuccessMutateAddProject,
  } = useAddProjectModal();
  const { isOpen, onClose, refetchProject, onOpenChange } = props;

  const { data: servicesData } = useQuery({
    queryKey: ["ServiceSelectOptions"],
    queryFn: async () => {
      const res = await serviceServices.getServices("page=1&limit=999");
      return res.data;
    },
  });

  useEffect(() => {
    if (isSuccessMutateAddProject) {
      onClose();
      refetchProject();
    }
  }, [isSuccessMutateAddProject]);
  const disabledSubmit = isPendingMutateAddProject;

  return (
    <Modal
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormProject(handleAddProject)}>
        <ModalContent className="m-4">
          <ModalHeader> Add Project </ModalHeader>
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
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Address"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.address !== undefined}
                    errorMessage={errors.address?.message}
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
                name="serviceId"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Select Service"
                    variant="bordered"
                    className="mb-2"
                    isInvalid={errors.serviceId !== undefined}
                    errorMessage={errors.serviceId?.message}
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys as Set<string>).join("");
                      field.onChange(selected);
                    }}
                  >
                    {(servicesData?.data || []).map((svc: any) => (
                      <SelectItem key={svc._id}>{svc.name}</SelectItem>
                    ))}
                  </Select>
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
              {isPendingMutateAddProject ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Project"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddProjectModal;
