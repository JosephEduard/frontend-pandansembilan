import { INews } from "@/types/News";
import { IService } from "@/types/Service";
import useInfoTab from "@/views/Admin/DetailNews/InfoTab/useInfoTab";

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

interface PropTypes {
  dataNews: INews;

  onUpdate: (data: INews) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  isFetchingNews?: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataNews,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
    isFetchingNews,
  } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  const toDateOnly = (dateStr?: string | Date) => {
    if (!dateStr) return "";
    const d = dateStr instanceof Date ? dateStr : new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const combineWithDeviceTimeToISO = (dateOnly?: string) => {
    if (!dateOnly) return undefined;
    const base = new Date(dateOnly as unknown as string);
    if (isNaN(base.getTime())) return undefined;
    const now = new Date();
    base.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds(),
    );
    return base.toISOString();
  };

  useEffect(() => {
    if (dataNews?.title) {
      setValueUpdateInfo("title", dataNews.title);
    }
    if (dataNews?.text) {
      setValueUpdateInfo("text", dataNews.text);
    }
    if (dataNews?.date) {
      setValueUpdateInfo("date", toDateOnly(dataNews.date));
    }
  }, [dataNews]);

  useEffect(() => {
    if (isSuccessUpdate) {
      // After updates (from either tab), reset with current service values
      resetUpdateInfo({
        title: dataNews?.title ?? "",
        text: dataNews?.text ?? "",
        date: toDateOnly(dataNews?.date ?? undefined),
      });
    }
  }, [isSuccessUpdate, dataNews]);

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi News</h1>
        <p className="text-small text-default-400 w-full">
          Atur Informasi News ini.
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo((form) => {
            const finalDate = combineWithDeviceTimeToISO(form.date);
            onUpdate({
              ...dataNews,
              title: form.title,
              text: form.text,
              date: finalDate,
            });
          })}
        >
          <Skeleton isLoaded={!isFetchingNews} className="rounded-lg">
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label=" News Title"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  errorMessage={errorsUpdateInfo.title?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetchingNews} className="rounded-lg">
            <Controller
              name="text"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Text"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.text !== undefined}
                  errorMessage={errorsUpdateInfo.text?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!isFetchingNews} className="rounded-lg">
            <Controller
              name="date"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Date"
                  variant="bordered"
                  type="date"
                  isInvalid={errorsUpdateInfo.date !== undefined}
                  errorMessage={errorsUpdateInfo.date?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>

          <Button
            color="danger"
            className="disabled:bg-default-500 mt-2"
            type="submit"
            disabled={isPendingUpdate || !dataNews?._id}
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
