import useMediaHandling from "@/hooks/useMediaHandling";
import serviceProjectImage from "@/services/projectimage.service";
import { IProjectImage } from "@/types/Projectimage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/router";

const schemaUpdateImages = null;

const useImagesTab = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
    mutateUploadMultipleFiles,
    isPendingMutateUploadMultipleFiles,
  } = useMediaHandling();

  const { query, isReady } = useRouter();
  const projectId = String(query.id || "");
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
    mutateAsync: mutateAddProjectImage,
    isPending: isPendingAddProjectImage,
  } = useMutation({ mutationFn: addProjectImage });

  const deleteProjectImage = async (id: string) => {
    await serviceProjectImage.deleteProjectImages(id);
    return id;
  };

  const {
    mutate: mutateDeleteProjectImage,
    isPending: isPendingDeleteProjectImage,
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
    // keeping existing API for symmetry; not used in multi-flow
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
