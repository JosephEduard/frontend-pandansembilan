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
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import serviceServices from "@/services/service";
import useAddProjectModal from "@/views/Admin/Project/AddProjectModal/useAddProjectModal";

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
    handleAddProject,
    handleOnClose,
    handleSubmitFormProject,
    isPendingMutateAddProject,
    isSuccessMutateAddProject,
  } = useAddProjectModal();
  const { isOpen, onClose, onOpenChange, refetchProject } = props;

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
      isDismissable={false}
      isOpen={isOpen}
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitFormProject(handleAddProject)}>
        <ModalContent className="m-4">
          <ModalHeader> Tambah Proyek</ModalHeader>
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
                    label="Judul Proyek"
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
                    label="Deskripsi Proyek"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mb-2"
                    errorMessage={errors.address?.message}
                    isInvalid={errors.address !== undefined}
                    label="Alamat"
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
                name="serviceId"
                render={({ field }) => (
                  <Select
                    className="mb-2"
                    errorMessage={errors.serviceId?.message}
                    isInvalid={errors.serviceId !== undefined}
                    label="Pilih Layanan"
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys as Set<string>).join("");

                      field.onChange(selected);
                    }}
                    selectedKeys={field.value ? [field.value] : []}
                    variant="bordered"
                  >
                    {(servicesData?.data || []).map((svc: any) => (
                      <SelectItem key={svc._id}>{svc.name}</SelectItem>
                    ))}
                  </Select>
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
                    <SelectItem key="true">Selesai</SelectItem>
                    <SelectItem key="false">Sedang Dalam Pengerjaan</SelectItem>
                  </Select>
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
              Cancel
            </Button>
            <Button color="danger" disabled={disabledSubmit} type="submit">
              {isPendingMutateAddProject ? (
                <Spinner color="white" size="sm" />
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
