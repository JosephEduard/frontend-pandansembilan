import { Button, Tab, Tabs } from "@heroui/react";

import InfoTab from "./InfoTab";
import ImageTab from "./ImageTab";

import useDetailNews from "@/views/Admin/DetailNews/useDetailNews";

const DetailNews = () => {
  const {
    dataNews,
    handleUpdateNews,
    isFetchingNews,
    isPendingMutateUpdateNews,
    isSuccessMutateUpdateNews,
    refetchNews,
  } = useDetailNews();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Button
          className="w-full text-xl font-bold"
          color="primary"
          disabled
          onPress={() => {}}
        >
          Laman Detail Berita
        </Button>
      </div>
      <Tabs aria-label="Options" onSelectionChange={() => refetchNews()}>
        <Tab key="image" title="Gambar">
          <ImageTab
            currentImage={dataNews?.image}
            isPendingUpdate={isPendingMutateUpdateNews}
            isSuccessUpdate={isSuccessMutateUpdateNews}
            onUpdate={handleUpdateNews}
          />
        </Tab>
        <Tab key="info" title="Info">
          <InfoTab
            dataNews={dataNews}
            isFetchingNews={isFetchingNews}
            isPendingUpdate={isPendingMutateUpdateNews}
            isSuccessUpdate={isSuccessMutateUpdateNews}
            onUpdate={handleUpdateNews}
          />
        </Tab>
      </Tabs>
      <div className="mt-4 flex items-center justify-end">
        <Button
          className="w-full"
          color="danger"
          onPress={() => window.history.back()}
          variant="flat"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default DetailNews;
