import { cn } from "@/utils/cn";
import { isPdfUrl } from "@/utils/fileType";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/react";
import Image from "next/image";
import {
  ChangeEvent,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { CiSaveUp2, CiTrash, CiFileOn } from "react-icons/ci";

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
}

const InputDocs = (props: PropTypes) => {
  const {
    name,
    className,
    isDropable = false,
    isInvalid,
    errorMessage,
    onUpload,
    onDelete,
    isDeleting,
    isUploading,
    preview,
    label,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();
  const isPdfPreview = isPdfUrl(preview);

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
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            {isPdfPreview ? (
              <div className="mb-2 flex flex-col items-center">
                <CiFileOn className="h-10 w-10 text-gray-400" />
                <a
                  href={`/api/media/proxy?url=${encodeURIComponent(preview)}&filename=${encodeURIComponent("document.pdf")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 mt-2 text-sm underline"
                >
                  Open PDF
                </a>
              </div>
            ) : (
              <div className="mb-2 w-1/2">
                <Image
                  fill
                  src={preview}
                  alt="image preview"
                  className="!relative"
                />
              </div>
            )}
            <Button
              isIconOnly
              className="bg-danger-100 absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded"
              onPress={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
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
                ? "Drag and drop an image or PDF here, or click to upload"
                : "Click to upload an image or PDF"}
            </p>
          </div>
        )}
        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner color="danger" />
          </div>
        )}
        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*,application/pdf"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>
      {isInvalid && (
        <p className="text-danger-500 p-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};
export default InputDocs;
