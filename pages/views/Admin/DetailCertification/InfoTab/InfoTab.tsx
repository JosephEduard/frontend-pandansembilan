import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import useInfoTab from "@/views/Admin/DetailCertification/InfoTab/useInfoTab";
import { ICertification } from "@/types/Certification";

interface PropTypes {
  dataCertification: ICertification;

  onUpdate: (data: ICertification) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  isFetchingCertification?: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataCertification,
    isFetchingCertification,
    isPendingUpdate,
    isSuccessUpdate,
    onUpdate,
  } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataCertification?.title) {
      setValueUpdateInfo("title", dataCertification.title);
    }
    if (dataCertification?.description) {
      setValueUpdateInfo("description", dataCertification.description);
    }
    if (dataCertification?.year) {
      setValueUpdateInfo("year", dataCertification.year);
    }
    if (dataCertification?.status) {
      setValueUpdateInfo("status", dataCertification.status);
    }
  }, [dataCertification]);

  useEffect(() => {
    if (isSuccessUpdate) {
      // After updates (from either tab), reset with current service values
      resetUpdateInfo({
        title: dataCertification?.title ?? "",
        description: dataCertification?.description ?? "",
        year: dataCertification?.year ?? "",
        status: dataCertification?.status ?? "",
      });
    }
  }, [isSuccessUpdate, dataCertification]);

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Certification</h1>
        <p className="text-small text-default-400 w-full">
          Atur Informasi Certification ini.
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo((form) => {
            onUpdate({
              ...dataCertification,
              title: form.title,
              description: form.description,
              year: form.year,
              status: form.status,
            });
          })}
        >
          <Skeleton className="rounded-lg" isLoaded={!isFetchingCertification}>
            <Controller
              control={controlUpdateInfo}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  className="mb-2"
                  errorMessage={errorsUpdateInfo.title?.message}
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  label=" Certificate Title"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!isFetchingCertification}>
            <Controller
              control={controlUpdateInfo}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="mb-2"
                  errorMessage={errorsUpdateInfo.description?.message}
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  label="Description"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!isFetchingCertification}>
            <Controller
              control={controlUpdateInfo}
              name="year"
              render={({ field }) => (
                <Input
                  {...field}
                  className="mb-2"
                  errorMessage={errorsUpdateInfo.year?.message}
                  isInvalid={errorsUpdateInfo.year !== undefined}
                  label="Year"
                  type="number"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!isFetchingCertification}>
            <Controller
              control={controlUpdateInfo}
              name="status"
              render={({ field }) => (
                <Select
                  className="mb-2"
                  errorMessage={errorsUpdateInfo.status?.message}
                  isInvalid={errorsUpdateInfo.status !== undefined}
                  label="Status"
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys as Set<string>).join("");

                    field.onChange(selected);
                  }}
                  selectedKeys={field.value ? [field.value] : []}
                  variant="bordered"
                >
                  <SelectItem key="true">true</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Button
            className="disabled:bg-default-500 mt-2"
            color="danger"
            disabled={isPendingUpdate || !dataCertification?._id}
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

export default InfoTab;
