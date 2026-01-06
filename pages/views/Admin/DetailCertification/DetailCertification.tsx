import { Button, Tab, Tabs } from "@heroui/react";

import InfoTab from "./InfoTab";
import FileTab from "./FileTab";

import useDetailCertification from "@/views/Admin/DetailCertification/useDetailCertification";

const DetailCertification = () => {
  const {
    dataCertification,
    handleUpdateCertification,
    isFetchingCertification,
    isPendingMutateUpdateCertification,
    isSuccessMutateUpdateCertification,
    refetchCertification,
  } = useDetailCertification();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Button
          className="w-full text-xl font-bold"
          color="primary"
          disabled
          onPress={() => {}}
        >
          Laman Detail Sertifikat
        </Button>
      </div>
      <Tabs
        aria-label="Options"
        onSelectionChange={() => refetchCertification()}
      >
        <Tab key="file" title="File">
          <FileTab
            currentFile={dataCertification?.file}
            isPendingUpdate={isPendingMutateUpdateCertification}
            isSuccessUpdate={isSuccessMutateUpdateCertification}
            onUpdate={handleUpdateCertification}
          />
        </Tab>
        <Tab key="info" title="Info">
          <InfoTab
            dataCertification={dataCertification}
            isFetchingCertification={isFetchingCertification}
            isPendingUpdate={isPendingMutateUpdateCertification}
            isSuccessUpdate={isSuccessMutateUpdateCertification}
            onUpdate={handleUpdateCertification}
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

export default DetailCertification;
