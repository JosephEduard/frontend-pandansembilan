import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { ToasterContext } from "@/contexts/ToasterContext";
import uploadServices from "@/services/upload.service";

const useMediaHandling = () => {
  const { setToaster } = useContext(ToasterContext);

  const uploadBanner = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();

    formData.append("file", file);
    const {
      data: {
        data: { secure_url: banner },
      },
    } = await uploadServices.uploadFile(formData);

    callback(banner);
  };

  const uploadMultiple = async (
    files: File[],
    callback: (fileUrls: string[]) => void,
  ) => {
    const formData = new FormData();

    files.forEach((f) => formData.append("files", f));
    const { data } = await uploadServices.uploadMultipleFile(formData);
    const raw = data?.data;
    let urls: string[] = [];

    if (Array.isArray(raw)) {
      if (raw.length > 0 && typeof raw[0] === "string") {
        urls = raw as string[];
      } else {
        urls = (raw as Array<Record<string, any>>)
          .map((item) => item?.secure_url || item?.url || item?.path)
          .filter(Boolean);
      }
    }
    callback(urls);
  };

  const { isPending: isPendingMutateUploadFile, mutate: mutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadBanner(variables.file, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
    });

  const {
    isPending: isPendingMutateUploadMultipleFiles,
    mutate: mutateUploadMultipleFiles,
  } = useMutation({
    mutationFn: (variables: {
      files: File[] | FileList;
      callback: (fileUrls: string[]) => void;
    }) =>
      uploadMultiple(
        Array.from(variables.files as FileList | File[]),
        variables.callback,
      ),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
  });

  const deleteBanner = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.deleteFile({ fileUrl });

    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { isPending: isPendingMutateDeleteFile, mutate: mutateDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteBanner(variables.fileUrl, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
    });

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateUploadMultipleFiles,
    isPendingMutateUploadMultipleFiles,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  };
};

export default useMediaHandling;
