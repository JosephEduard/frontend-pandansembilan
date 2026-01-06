import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { IProject } from "@/types/Project";
import serviceProjects from "@/services/project.service";
import { ToasterContext } from "@/contexts/ToasterContext";

const schema = yup.object({
  title: yup.string().required("Mohon masukkan judul proyek"),
  description: yup.string().required("Mohon masukkan deskripsi proyek"),
  address: yup.string().required("Mohon masukkan alamat proyek"),
  serviceId: yup.string().required("Mohon pilih layanan"),
  year: yup.string().required("Mohon masukkan tahun proyek"),
  status: yup.string().required("Mohon masukkan status proyek"),
});

const useAddProjectModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    formState: { errors },
    handleSubmit: handleSubmitFormProject,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  const addProject = async (payload: IProject) => {
    const res = await serviceProjects.addProjects(payload);

    return res;
  };

  const {
    isPending: isPendingMutateAddProject,
    isSuccess: isSuccessMutateAddProject,
    mutate: mutateAddProject,
  } = useMutation({
    mutationFn: addProject,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Proyek berhasil ditambahkan",
      });
      reset();
    },
  });

  const handleAddProject = (data: IProject) => mutateAddProject(data);

  return {
    control,
    errors,
    reset,
    handleSubmitFormProject,
    handleAddProject,
    isPendingMutateAddProject,
    isSuccessMutateAddProject,
    handleOnClose,
  };
};

export default useAddProjectModal;
