import { Button, Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";

import useDetailCertification from "@/views/Admin/DetailCertification/useDetailCertification";
import FileTab from "./FileTab";

const DetailCertification = () => {
  const {
    dataCertification,
    handleUpdateCertification,
    isPendingMutateUpdateCertification,
    isSuccessMutateUpdateCertification,
    refetchCertification,
    isFetchingCertification,
  } = useDetailCertification();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Button
          color="primary"
          onPress={() => {}}
          className="w-full text-xl font-bold"
          disabled
        >
          Detail Certification
        </Button>
      </div>
      <Tabs
        aria-label="Options"
        onSelectionChange={() => refetchCertification()}
      >
        <Tab key="file" title="File">
          <FileTab
            currentFile={dataCertification?.file}
            onUpdate={handleUpdateCertification}
            isPendingUpdate={isPendingMutateUpdateCertification}
            isSuccessUpdate={isSuccessMutateUpdateCertification}
          />
        </Tab>
        <Tab key="info" title="Info">
          <InfoTab
            dataCertification={dataCertification}
            onUpdate={handleUpdateCertification}
            isPendingUpdate={isPendingMutateUpdateCertification}
            isSuccessUpdate={isSuccessMutateUpdateCertification}
            isFetchingCertification={isFetchingCertification}
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
export default DetailCertification;
