import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
  Input,
  Pagination,
} from "@heroui/react";
import { Key, useCallback, useEffect, useState } from "react";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { useRouter } from "next/router";

import { COLUMN_LIST_PROJECT } from "../../../../constants/Project.constants";

import AddProjectModal from "./AddProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";

import useProject from "@/views/Admin/Project/useProject";
import DataTable from "@/components/ui/DataTable";
import useMediaQuery from "@/hooks/useMediaQuery";

// Interface untuk tipe Project
interface Project {
  _id?: string;
  title?: string;
  description?: string;
  address?: string;
  serviceId?: string;
  serviceName?: string;
  year?: string | Date;
  status?: string;
  [key: string]: unknown;
}

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

  // Deteksi ukuran layar
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const shouldUseMobileView = isMobile || isTablet;

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (projects: Record<string, unknown>, columnKey: Key) => {
      const cellValue = projects[columnKey as keyof typeof projects];

      switch (columnKey) {
        case "year": {
          const v = cellValue as unknown as string | Date | undefined;

          if (!v) return "";
          try {
            const d = typeof v === "string" ? new Date(v) : (v as Date);

            return isNaN(d.getTime()) ? String(v) : d.getFullYear().toString();
          } catch {
            return String(v);
          }
        }
        case "status": {
          const statusBool = cellValue as unknown as boolean | string;

          if (statusBool === true || statusBool === "true") {
            return "Selesai";
          } else if (statusBool === false || statusBool === "false") {
            return "Sedang Dalam Pengerjaan";
          } else {
            return "Tidak Diketahui";
          }
        }
        case "description": {
          const text = (cellValue ?? "") as string;

          return (
            <div
              className="overflow-hidden break-words whitespace-pre-line"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 20, // clamp to 20 lines; increase if needed
                WebkitBoxOrient: "vertical",
                overflowWrap: "anywhere", // handles very long strings without spaces
                maxWidth: "100%",
              }}
            >
              {text}
            </div>
          );
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
                  Lihat Proyek
                </DropdownItem>
                <DropdownItem
                  className="text-danger-500"
                  key="delete-projects"
                  onPress={() => {
                    setSelectedId(`${projects._id}`);
                    deleteProjectModal.onOpen();
                  }}
                >
                  Hapus Proyek
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

  // Komponen untuk tampilan mobile
  const MobileProjectCard = ({ project }: { project: Project }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Filter kolom yang akan ditampilkan di dropdown (exclude actions dan banner)
    const detailColumns = COLUMN_LIST_PROJECT.filter(
      (col: Record<string, unknown>) =>
        col.uid !== "actions" && col.uid !== "banner",
    );

    return (
      <Card className="mb-4 p-2">
        <CardHeader className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold">
              {String(project.title || "Untitled")}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onPress={() => setIsOpen(!isOpen)}
              size="sm"
              variant="light"
            >
              {isOpen ? "Sembunyikan" : "Tampilkan Detail"}
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={`detail-${project._id}`}
                  onPress={() => push(`/admin/project/${project._id}`)}
                >
                  Lihat Proyek
                </DropdownItem>
                <DropdownItem
                  className="text-danger-500"
                  key={`delete-${project._id}`}
                  onPress={() => {
                    setSelectedId(`${project._id}`);
                    deleteProjectModal.onOpen();
                  }}
                >
                  Hapus Proyek
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>

        {isOpen && (
          <>
            <Divider />
            <CardBody>
              {/* Banner image di mobile
              {project.image && typeof project.image === "string" && (
                <div className="mb-4">
                  <div className="relative h-40 w-full">
                    <Image
                      alt="image"
                      fill
                      src={project.image}
                      className="rounded-md object-cover"
                    />
                  </div>
                </div>
              )} */}

              {/* Detail informasi */}
              <div className="space-y-3">
                {detailColumns.map((column: Record<string, unknown>) => (
                  <div
                    className="grid grid-cols-2 gap-2"
                    key={column.uid as string}
                  >
                    <div className="font-medium text-gray-600">
                      {String(column.name)}:
                    </div>
                    <div className="text-gray-900">
                      {renderCell(project, column.uid as Key)}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </>
        )}
      </Card>
    );
  };

  // Komponen untuk konten atas (search dan button) - HANYA untuk mobile
  const MobileTopContent = (
    <div className="mb-7 flex flex-col-reverse items-start justify-between gap-y-4 p-8 lg:flex-row lg:items-center">
      <Input
        className="w-full sm:max-w-[24%]"
        isClearable
        onChange={handleSearch}
        onClear={handleClearSearch}
        placeholder="Cari berdasarkan judul"
        startContent={<CiSearch />}
      />
      <Button color="danger" onPress={addProjectModal.onOpen}>
        Tambah Proyek
      </Button>
    </div>
  );

  // Komponen untuk konten bawah (pagination) - HANYA untuk mobile
  const MobileBottomContent = (
    <div className="mt-4 flex items-center justify-center p-8">
      {dataProject?.pagination.totalPages > 1 && (
        <Pagination
          color="danger"
          isCompact={shouldUseMobileView}
          onChange={handleChangePage}
          page={Number(currentPage) || 1}
          showControls={!shouldUseMobileView}
          showShadow
          total={dataProject?.pagination.totalPages || 1}
        />
      )}
    </div>
  );

  // Render konten utama
  const renderContent = () => {
    if (Object.keys(query).length === 0) return null;

    if (shouldUseMobileView) {
      // TAMPILAN MOBILE/TABLET
      return (
        <>
          {MobileTopContent}

          {/* Loading State */}
          {(isLoadingProject || isRefetchingProject) && (
            <div className="flex h-64 items-center justify-center">
              <Spinner color="danger" size="lg" />
            </div>
          )}

          {/* Empty State */}
          {!isLoadingProject && dataProject?.data.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">Tidak Ada data proyek.</p>
            </div>
          )}

          {/* Mobile/Tablet View - List Projects */}
          {!isLoadingProject && dataProject?.data.length > 0 && (
            <div className="space-y-4 px-8">
              {dataProject.data.map((project: Project) => (
                <MobileProjectCard
                  key={String(project._id)}
                  project={project}
                />
              ))}

              {/* Bottom Content untuk mobile */}
              {MobileBottomContent}
            </div>
          )}
        </>
      );
    } else {
      // TAMPILAN DESKTOP
      return (
        <DataTable
          buttonTopContentLabel="Tambah Project"
          columns={COLUMN_LIST_PROJECT}
          currentPage={Number(currentPage) || 1}
          data={dataProject?.data || []}
          emptyContent="Tidak Ada data proyek."
          isLoading={isLoadingProject || isRefetchingProject}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addProjectModal.onOpen}
          renderCell={renderCell}
          totalPages={dataProject?.pagination.totalPages || 1}
        />
      );
    }
  };

  return (
    <section>
      {renderContent()}

      {/* Modals - Tampil di semua view */}
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
