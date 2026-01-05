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
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import useInfoTab from "@/views/Admin/DetailProject/InfoTab/useInfoTab";
import { IProject } from "@/types/Project";
import serviceServices from "@/services/service";

interface PropTypes {
  dataProject: IProject;

  onUpdate: (data: IProject) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  isFetchingProject?: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataProject,
    isFetchingProject,
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

  const { data: servicesData } = useQuery({
    queryKey: ["ServiceSelectOptions"],
    queryFn: async () => {
      const res = await serviceServices.getServices("page=1&limit=999");

      return res.data;
    },
  });

  useEffect(() => {
    if (dataProject?.title) {
      setValueUpdateInfo("title", dataProject.title);
    }
    if (dataProject?.description) {
      setValueUpdateInfo("description", dataProject.description);
    }
    if (dataProject?.address) {
      setValueUpdateInfo("address", dataProject.address);
    }
    if (dataProject?.serviceId) {
      setValueUpdateInfo("serviceId", dataProject.serviceId);
    }
    if (dataProject?.year) {
      setValueUpdateInfo("year", dataProject.year);
    }
    if (dataProject?.status) {
      setValueUpdateInfo("status", dataProject.status);
    }
  }, [dataProject]);

  useEffect(() => {
    if (isSuccessUpdate) {
      // After updates (from either tab), reset with current service values
      resetUpdateInfo({
        title: dataProject?.title ?? "",
        description: dataProject?.description ?? "",
        address: dataProject?.address ?? "",
        serviceId: dataProject?.serviceId ?? "",
        year: dataProject?.year ?? "",
        status: dataProject?.status ?? "",
      });
    }
  }, [isSuccessUpdate, dataProject]);

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Project</h1>
        <p className="text-small text-default-400 w-full">
          Atur Informasi Project ini.
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton className="rounded-lg" isLoaded={!isFetchingProject}>
            <Controller
              control={controlUpdateInfo}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  className="mt-2"
                  errorMessage={errorsUpdateInfo.title?.message}
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  label="Project Title"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!isFetchingProject}>
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
          <Skeleton className="rounded-lg" isLoaded={!isFetchingProject}>
            <Controller
              control={controlUpdateInfo}
              name="address"
              render={({ field }) => (
                <Input
                  {...field}
                  className="mt-2"
                  errorMessage={errorsUpdateInfo.address?.message}
                  isInvalid={errorsUpdateInfo.address !== undefined}
                  label="Address"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!isFetchingProject}>
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
          <Skeleton className="rounded-lg" isLoaded={!isFetchingProject}>
            <Controller
              control={controlUpdateInfo}
              name="serviceId"
              render={({ field }) => (
                <Select
                  className="mb-2"
                  errorMessage={errorsUpdateInfo.serviceId?.message}
                  isInvalid={errorsUpdateInfo.serviceId !== undefined}
                  label="Select Service"
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys as Set<string>).join("");

                    field.onChange(selected);
                  }}
                  selectedKeys={field.value ? [field.value] : []}
                  variant="bordered"
                >
                  {(servicesData?.data || []).map((svc: any) => (
                    <SelectItem key={svc._id}>{svc.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={!isFetchingProject}>
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
            disabled={isPendingUpdate || !dataProject?._id}
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
