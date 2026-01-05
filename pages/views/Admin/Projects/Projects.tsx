import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { Key, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/router";

import { COLUMN_LIST_PROJECT } from "./Project.constants";
import AddProjectModal from "./AddProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";

import useProject from "@/views/Admin/Project/useProject";
import DataTable from "@/components/ui/DataTable";

const Projects = () => {
  const { isReady, push, query } = useRouter();
  const {
    currentLimit,
    currentPage,
    dataProject,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
    isLoadingProject,
    isRefetchingProject,
    refetchProject,
    selectedId,
    setSelectedId,
    setURL,
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
            <Image alt="banner" height={200} src={`${cellValue}`} width={100} />
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
                  className="text-danger-500"
                  key="delete-projects"
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
        refetchProject={refetchProject}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Projects;
