import { Button, Tab, Tabs } from "@heroui/react";
import BannerTab from "./BannerTab";
import InfoTab from "./InfoTab";
import useDetailService from "@/views/Admin/DetailService/useDetailService";

const DetailServices = () => {
  const {
    dataService,

    handleUpdateService,
    isPendingMutateUpdateService,
    isSuccessMutateUpdateService,
    refetchService,
    isFetchingService,
  } = useDetailService();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Button
          color="primary"
          onPress={() => {}}
          className="w-full text-xl font-bold"
          disabled
        >
          Detail Service
        </Button>
      </div>
      <Tabs aria-label="Options" onSelectionChange={() => refetchService()}>
        <Tab key="banner" title="Banner">
          <BannerTab
            currentBanner={dataService?.banner}
            onUpdate={handleUpdateService}
            isPendingUpdate={isPendingMutateUpdateService}
            isSuccessUpdate={isSuccessMutateUpdateService}
          />
        </Tab>
        <Tab key="info" title="Info">
          <InfoTab
            dataService={dataService}
            onUpdate={handleUpdateService}
            isPendingUpdate={isPendingMutateUpdateService}
            isSuccessUpdate={isSuccessMutateUpdateService}
            isFetchingService={isFetchingService}
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
export default DetailServices;
