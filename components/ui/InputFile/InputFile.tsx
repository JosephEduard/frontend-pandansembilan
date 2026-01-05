import { Button } from "@heroui/button";
import { Spinner } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useId, useRef } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

import { cn } from "@/utils/cn";

interface PropTypes {
  name: string;
  isDropable?: boolean;
  className?: string;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  preview?: string;
  isDeleting?: boolean;
  isUploading?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  label?: ReactNode;
  allowMultiple?: boolean;
}

const InputFile = (props: PropTypes) => {
  const {
    allowMultiple = false,
    className,
    errorMessage,
    isDeleting,
    isDropable = false,
    isInvalid,
    isUploading,
    label,
    name,
    onDelete,
    onUpload,
    preview,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;

    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;

    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      {label}
      <label
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-danger-500": isInvalid },
        )}
        htmlFor={`dropzone-file-${dropzoneId}`}
        ref={drop}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image alt="image" className="!relative" fill src={preview} />
            </div>
            <Button
              className="bg-danger-100 absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded"
              disabled={isDeleting}
              isIconOnly
              onPress={onDelete}
            >
              {isDeleting ? (
                <Spinner color="danger" size="sm" />
              ) : (
                <CiTrash className="text-danger-500 h-5 w-5" />
              )}
            </Button>
          </div>
        )}
        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? `Drag and drop ${allowMultiple ? "images" : "an image"} here, or click to upload`
                : `Click to upload ${allowMultiple ? "images" : "an image"}`}
            </p>
          </div>
        )}
        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner color="danger" />
          </div>
        )}
        <input
          accept="image/*"
          className="hidden"
          disabled={!allowMultiple && preview !== ""}
          id={`dropzone-file-${dropzoneId}`}
          multiple={allowMultiple}
          name={name}
          onChange={handleOnUpload}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
          type="file"
        />
      </label>
      {isInvalid && (
        <p className="text-danger-500 p-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
