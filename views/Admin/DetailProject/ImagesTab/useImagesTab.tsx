import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

import useMediaHandling from "@/hooks/useMediaHandling";
import serviceProjectImage from "@/services/projectimage.service";
import { IProjectImage } from "@/types/Projectimage";
import { ToasterContext } from "@/contexts/ToasterContext";

const useImagesTab = () => {
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateUploadMultipleFiles,
    mutateDeleteFile,
    mutateUploadFile,
    mutateUploadMultipleFiles,
  } = useMediaHandling();

  const { isReady, query } = useRouter();
  const projectId = String(query.id || "");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { setToaster } = useContext(ToasterContext);

  const getProjectImages = async () => {
    if (!projectId) return [] as IProjectImage[];
    const { data } =
      await serviceProjectImage.getProjectImagesProjectByProjectId(
        projectId as unknown as IProjectImage,
      );

    return data.data as IProjectImage[];
  };

  const { data: projectImages = [], refetch: refetchProjectImages } = useQuery({
    queryKey: ["ProjectImages", projectId],
    queryFn: getProjectImages,
    enabled: isReady && !!projectId,
  });

  const addProjectImage = async (payload: IProjectImage) => {
    const { data } = await serviceProjectImage.addProjectImages(payload);

    return data.data as IProjectImage;
  };

  const {
    isPending: isPendingAddProjectImage,
    mutateAsync: mutateAddProjectImage,
  } = useMutation({ mutationFn: addProjectImage });

  const deleteProjectImage = async (id: string) => {
    await serviceProjectImage.deleteProjectImages(id);

    return id;
  };

  const {
    isPending: isPendingDeleteProjectImage,
    mutate: mutateDeleteProjectImage,
  } = useMutation({
    mutationFn: deleteProjectImage,
    onSuccess: async () => {
      await refetchProjectImages();
    },
    onSettled: () => setDeletingId(null),
  });

  const preview = "";

  const handleUploadImages = (
    files: FileList,
    onChange?: (files: FileList | undefined) => void,
  ) => {
    if (!projectId) return;
    if (!files || files.length === 0) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
    const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB total
    const fileArray = Array.from(files);
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const invalidType = fileArray.find((f) => f && !allowed.includes(f.type));

    if (invalidType) {
      setToaster({
        type: "error",
        message: "Format file harus JPG/PNG/WEBP.",
      });
      if (onChange) onChange(undefined);

      return;
    }
    const oversize = fileArray.find((f) => (f?.size ?? 0) > MAX_FILE_SIZE);

    if (oversize) {
      setToaster({ type: "error", message: "Ukuran file maksimal 5MB." });
      if (onChange) onChange(undefined);

      return;
    }

    const totalSize = fileArray.reduce((acc, f) => acc + (f?.size ?? 0), 0);

    if (totalSize > MAX_TOTAL_SIZE) {
      setToaster({ type: "error", message: "Total ukuran file maksimal 5MB." });
      if (onChange) onChange(undefined);

      return;
    }

    const run = async () => {
      if (files.length > 1) {
        mutateUploadMultipleFiles({
          files,
          callback: async (urls: string[]) => {
            for (const url of urls) {
              await mutateAddProjectImage({ image: url, projectId });
            }
            await refetchProjectImages();
            if (onChange) onChange(undefined);
          },
        });
      } else {
        mutateUploadFile({
          file: files[0],
          callback: async (url: string) => {
            await mutateAddProjectImage({ image: url, projectId });
            await refetchProjectImages();
            if (onChange) onChange(undefined);
          },
        });
      }
    };

    run();
  };

  const handleDeleteImages = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    onChange(undefined);
  };

  const handleDeleteImage = (id?: string) => {
    if (!id) return;
    setDeletingId(id);
    mutateDeleteProjectImage(id);
  };

  return {
    handleDeleteImages,
    handleUploadImages,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateUploadMultipleFiles,
    isPendingAddProjectImage,
    isPendingDeleteProjectImage,

    preview,
    projectImages,
    refetchProjectImages,
    handleDeleteImage,
    deletingId,

    // No RHF form for multi upload
    controlUpdateImages: undefined as never,
    handleSubmitUpdateImages: ((fn: any) => fn) as never,
    errorsUpdateImages: {} as any,
    resetUpdateImages: (() => {}) as any,
  };
};

export default useImagesTab;
