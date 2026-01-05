import { Button, Tab, Tabs } from "@heroui/react";

import BannerTab from "./BannerTab";
import InfoTab from "./InfoTab";

import useDetailService from "@/views/Admin/DetailService/useDetailService";

const DetailServices = () => {
  const {
    dataService,

    handleUpdateService,
    isFetchingService,
    isPendingMutateUpdateService,
    isSuccessMutateUpdateService,
    refetchService,
  } = useDetailService();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Button
          className="w-full text-xl font-bold"
          color="primary"
          disabled
          onPress={() => {}}
        >
          Detail Service
        </Button>
      </div>
      <Tabs aria-label="Options" onSelectionChange={() => refetchService()}>
        <Tab key="banner" title="Banner">
          <BannerTab
            currentBanner={dataService?.banner}
            isPendingUpdate={isPendingMutateUpdateService}
            isSuccessUpdate={isSuccessMutateUpdateService}
            onUpdate={handleUpdateService}
          />
        </Tab>
        <Tab key="info" title="Info">
          <InfoTab
            dataService={dataService}
            isFetchingService={isFetchingService}
            isPendingUpdate={isPendingMutateUpdateService}
            isSuccessUpdate={isSuccessMutateUpdateService}
            onUpdate={handleUpdateService}
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

export default DetailServices;
