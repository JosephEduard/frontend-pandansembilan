import { ICertification } from "@/types/Certification";
import useInfoTab from "@/views/Admin/DetailCertification/InfoTab/useInfoTab";
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
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
    isFetchingCertification,
  } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
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
          <Skeleton isLoaded={!isFetchingCertification} className="rounded-lg">
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label=" Certificate Title"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  errorMessage={errorsUpdateInfo.title?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetchingCertification} className="rounded-lg">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetchingCertification} className="rounded-lg">
            <Controller
              name="year"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Year"
                  variant="bordered"
                  type="number"
                  isInvalid={errorsUpdateInfo.year !== undefined}
                  errorMessage={errorsUpdateInfo.year?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetchingCertification} className="rounded-lg">
            <Controller
              name="status"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  label="Status"
                  variant="bordered"
                  className="mb-2"
                  isInvalid={errorsUpdateInfo.status !== undefined}
                  errorMessage={errorsUpdateInfo.status?.message}
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys as Set<string>).join("");
                    field.onChange(selected);
                  }}
                >
                  <SelectItem key="true">true</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Button
            color="danger"
            className="disabled:bg-default-500 mt-2"
            type="submit"
            disabled={isPendingUpdate || !dataCertification?._id}
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

export default InfoTab;
