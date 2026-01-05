import DataTable from "@/components/ui/DataTable";
import useProject from "@/views/Admin/Project/useProject";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_PROJECT } from "./Project.constants";
import { useRouter } from "next/router";
import AddProjectModal from "./AddProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";

const Projects = () => {
  const { push, isReady, query } = useRouter();
  const {
    currentLimit,
    currentPage,
    setURL,
    dataProject,
    isLoadingProject,
    isRefetchingProject,
    refetchProject,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    selectedId,
    setSelectedId,
  } = useProject();

  const addProjectModal = useDisclosure();
  const deleteProjectModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (projects: Record<string, unknown>, columnKey: Key) => {
      const cellValue = projects[columnKey as keyof typeof projects];

      switch (columnKey) {
        case "banner":
          return (
            <Image src={`${cellValue}`} alt="banner" width={100} height={200} />
          );
        case "year": {
          const v = cellValue as unknown as string | Date | undefined;
          if (!v) return "";
          try {
            const d = typeof v === "string" ? new Date(v) : (v as Date);
            return isNaN(d.getTime()) ? String(v) : d.toLocaleDateString();
          } catch {
            return String(v);
          }
        }
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-projects-button"
                  onPress={() => push(`/admin/project/${projects._id}`)}
                >
                  Detail Projects
                </DropdownItem>
                <DropdownItem
                  key="delete-projects"
                  className="text-danger-500"
                  onPress={() => {
                    setSelectedId(`${projects._id}`);
                    deleteProjectModal.onOpen();
                  }}
                >
                  Delete Project
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          if (cellValue === null || cellValue === undefined) return "";
          const t = typeof cellValue;
          if (t === "object") return "";
          return String(cellValue);
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Tambah Project"
          columns={COLUMN_LIST_PROJECT}
          currentPage={Number(currentPage)}
          data={dataProject?.data || []}
          emptyContent="Tidak Ada data project."
          isLoading={isLoadingProject || isRefetchingProject}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addProjectModal.onOpen}
          renderCell={renderCell}
          totalPages={dataProject?.pagination.totalPages}
        />
      )}
      <AddProjectModal
        isOpen={addProjectModal.isOpen}
        onClose={addProjectModal.onClose}
        onOpenChange={addProjectModal.onOpenChange}
        refetchProject={refetchProject}
      />
      <DeleteProjectModal
        isOpen={deleteProjectModal.isOpen}
        onClose={deleteProjectModal.onClose}
        onOpenChange={deleteProjectModal.onOpenChange}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchProject={refetchProject}
      />
    </section>
  );
};
export default Projects;
