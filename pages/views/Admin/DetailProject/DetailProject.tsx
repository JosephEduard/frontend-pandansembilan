import { Button, Tab, Tabs } from "@heroui/react";

import InfoTab from "./InfoTab";
import ImagesTab from "./ImagesTab";

import useDetailProject from "@/views/Admin/DetailProject/useDetailProject";

const DetailProject = () => {
  const {
    dataProject,

    handleUpdateProject,
    isFetchingProject,
    isPendingMutateUpdateProject,
    isSuccessMutateUpdateProject,
    refetchProject,
  } = useDetailProject();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Button
          className="w-full text-xl font-bold"
          color="primary"
          disabled
          onPress={() => {}}
        >
          Laman Detail Proyek
        </Button>
      </div>
      <Tabs aria-label="Options" onSelectionChange={() => refetchProject()}>
        <Tab key="images" title="Gambar">
          <ImagesTab isSuccessUpdate={isSuccessMutateUpdateProject} />
        </Tab>
        <Tab key="info" title="Info">
          <InfoTab
            dataProject={dataProject}
            isFetchingProject={isFetchingProject}
            isPendingUpdate={isPendingMutateUpdateProject}
            isSuccessUpdate={isSuccessMutateUpdateProject}
            onUpdate={handleUpdateProject}
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

export default DetailProject;
