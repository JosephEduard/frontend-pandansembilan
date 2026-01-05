import { Button, Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailNews from "@/views/Admin/DetailNews/useDetailNews";
import ImageTab from "./ImageTab";

const DetailNews = () => {
  const {
    dataNews,
    handleUpdateNews,
    isPendingMutateUpdateNews,
    isSuccessMutateUpdateNews,
    refetchNews,
    isFetchingNews,
  } = useDetailNews();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Button
          color="primary"
          onPress={() => {}}
          className="w-full text-xl font-bold"
          disabled
        >
          Detail News
        </Button>
      </div>
      <Tabs aria-label="Options" onSelectionChange={() => refetchNews()}>
        <Tab key="image" title="Image">
          <ImageTab
            currentImage={dataNews?.image}
            onUpdate={handleUpdateNews}
            isPendingUpdate={isPendingMutateUpdateNews}
            isSuccessUpdate={isSuccessMutateUpdateNews}
          />
        </Tab>
        <Tab key="info" title="Info">
          <InfoTab
            dataNews={dataNews}
            onUpdate={handleUpdateNews}
            isPendingUpdate={isPendingMutateUpdateNews}
            isSuccessUpdate={isSuccessMutateUpdateNews}
            isFetchingNews={isFetchingNews}
          />
        </Tab>
      </Tabs>
      <div className="mt-4 flex items-center justify-end">
        <Button
          color="danger"
          onPress={() => window.history.back()}
          variant="flat"
          className="w-full"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
};
export default DetailNews;
