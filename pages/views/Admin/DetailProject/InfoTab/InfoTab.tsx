import serviceServices from "@/services/service";
import { IProject } from "@/types/Project";
import useInfoTab from "@/views/Admin/DetailProject/InfoTab/useInfoTab";
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
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
    isFetchingProject,
  } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
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
          <Skeleton isLoaded={!isFetchingProject} className="rounded-lg">
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Project Title"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  errorMessage={errorsUpdateInfo.title?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetchingProject} className="rounded-lg">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetchingProject} className="rounded-lg">
            <Controller
              name="address"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Address"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.address !== undefined}
                  errorMessage={errorsUpdateInfo.address?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetchingProject} className="rounded-lg">
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
          <Skeleton isLoaded={!isFetchingProject} className="rounded-lg">
            <Controller
              name="serviceId"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  label="Select Service"
                  variant="bordered"
                  className="mb-2"
                  isInvalid={errorsUpdateInfo.serviceId !== undefined}
                  errorMessage={errorsUpdateInfo.serviceId?.message}
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys as Set<string>).join("");
                    field.onChange(selected);
                  }}
                >
                  {(servicesData?.data || []).map((svc: any) => (
                    <SelectItem key={svc._id}>{svc.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetchingProject} className="rounded-lg">
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
            disabled={isPendingUpdate || !dataProject?._id}
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
