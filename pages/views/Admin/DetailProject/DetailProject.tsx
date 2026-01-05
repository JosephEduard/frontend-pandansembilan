import { Button, Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailProject from "@/views/Admin/DetailProject/useDetailProject";
import ImagesTab from "./ImagesTab";

const DetailProject = () => {
  const {
    dataProject,

    handleUpdateProject,
    isPendingMutateUpdateProject,
    isSuccessMutateUpdateProject,
    refetchProject,
    isFetchingProject,
  } = useDetailProject();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Button
          color="primary"
          onPress={() => {}}
          className="w-full text-xl font-bold"
          disabled
        >
          Detail Project
        </Button>
      </div>
      <Tabs aria-label="Options" onSelectionChange={() => refetchProject()}>
        <Tab key="images" title="Images">
          <ImagesTab
            currentImages={dataProject?.banner}
            onUpdate={handleUpdateProject}
            isPendingUpdate={isPendingMutateUpdateProject}
            isSuccessUpdate={isSuccessMutateUpdateProject}
          />
        </Tab>
        <Tab key="info" title="Info">
          <InfoTab
            dataProject={dataProject}
            onUpdate={handleUpdateProject}
            isPendingUpdate={isPendingMutateUpdateProject}
            isSuccessUpdate={isSuccessMutateUpdateProject}
            isFetchingProject={isFetchingProject}
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
export default DetailProject;
