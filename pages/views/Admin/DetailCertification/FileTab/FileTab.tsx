import InputDocs from "@/components/ui/InputDocs";
import { ICertification } from "@/types/Certification";
import useFileTab from "@/views/Admin/DetailCertification/FileTab/useFileTab";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import File from "next/image";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropTypes {
  currentFile: string;
  onUpdate: (data: ICertification) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const FileTab = (props: PropTypes) => {
  const { currentFile, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteFile,
    handleUploadFile,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    preview,

    controlUpdateFile,
    handleSubmitUpdateFile,
    errorsUpdateFile,
    resetUpdateFile,
  } = useFileTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateFile();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">File Certificate</h1>
        <p className="text-small text-default-400 w-full">
          Atur File Certificate ini.
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateFile(onUpdate)}
        >
          <div className="flex flex-col gap-4">
            <p className="text-default-700 text-sm font-medium">
              File saat ini
            </p>
            <Skeleton
              isLoaded={!!currentFile}
              className="aspect-square rounded-lg"
            >
              <File src={currentFile} alt="file" fill className="relative" />
            </Skeleton>
          </div>
          <Controller
            name="file"
            control={controlUpdateFile}
            render={({ field: { onChange, value, ...field } }) => (
              <InputDocs
                {...field}
                onUpload={(files) => handleUploadFile(files, onChange)}
                onDelete={() => handleDeleteFile(onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateFile.file !== undefined}
                errorMessage={errorsUpdateFile.file?.message}
                isDropable
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload File Baru
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            color="danger"
            className="disabled:bg-default-500 mt-2"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default FileTab;
