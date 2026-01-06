import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import useInfoTab from "@/views/Admin/DetailService/InfoTab/useInfoTab";
import { IService } from "@/types/Service";

interface PropTypes {
  dataService: IService;

  onUpdate: (data: IService) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  isFetchingService?: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataService,
    isFetchingService,
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
    if (dataService?.name) {
      setValueUpdateInfo("name", dataService.name);
    }
    if (dataService?.description) {
      setValueUpdateInfo("description", dataService.description);
    }
  }, [dataService]);

  useEffect(() => {
    if (isSuccessUpdate) {
      // After updates (from either tab), reset with current service values
      resetUpdateInfo({
        name: dataService?.name ?? "",
        description: dataService?.description ?? "",
      });
    }
  }, [isSuccessUpdate, dataService]);

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Layanan</h1>
        <p className="text-small text-default-400 w-full">
          Atur informasi layanan ini.
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton className="rounded-lg" isLoaded={!isFetchingService}>
            <Controller
              control={controlUpdateInfo}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  className="mt-2"
                  errorMessage={errorsUpdateInfo.name?.message}
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  label="Name"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!isFetchingService}>
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
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Button
            className="disabled:bg-default-500 mt-2"
            color="danger"
            disabled={isPendingUpdate || !dataService?._id}
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
