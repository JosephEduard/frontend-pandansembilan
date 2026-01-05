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

import useFileTab from "@/views/Admin/DetailCertification/FileTab/useFileTab";
import { ICertification } from "@/types/Certification";
import InputDocs from "@/components/ui/InputDocs";

interface PropTypes {
  currentFile: string;
  onUpdate: (data: ICertification) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const FileTab = (props: PropTypes) => {
  const { currentFile, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    controlUpdateFile,
    errorsUpdateFile,
    handleDeleteFile,
    handleSubmitUpdateFile,

    handleUploadFile,

    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,
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
              className="aspect-square rounded-lg"
              isLoaded={!!currentFile}
            >
              <File alt="file" className="relative" fill src={currentFile} />
            </Skeleton>
          </div>
          <Controller
            control={controlUpdateFile}
            name="file"
            render={({ field: { onChange, value, ...field } }) => (
              <InputDocs
                {...field}
                errorMessage={errorsUpdateFile.file?.message}
                isDeleting={isPendingMutateDeleteFile}
                isDropable
                isInvalid={errorsUpdateFile.file !== undefined}
                isUploading={isPendingMutateUploadFile}
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload File Baru
                  </p>
                }
                onDelete={() => handleDeleteFile(onChange)}
                onUpload={(files) => handleUploadFile(files, onChange)}
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            className="disabled:bg-default-500 mt-2"
            color="danger"
            disabled={isPendingMutateUploadFile || isPendingUpdate}
            type="submit"
          >
            {isPendingUpdate ? (
              <Spinner color="white" size="sm" />
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
