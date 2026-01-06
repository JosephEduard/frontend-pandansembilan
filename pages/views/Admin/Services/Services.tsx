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
import Image from "next/image";
import { Key, useCallback, useEffect, useState } from "react";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { useRouter } from "next/router";
import DataTable from "@/components/ui/DataTable";
import useMediaQuery from "@/hooks/useMediaQuery";
import useService from "@/views/Admin/Service/useService";
import { COLUMN_LIST_SERVICE } from "@/constants/Services.constants";
import DeleteServiceModal from "./DeleteServiceModal";
import AddServiceModal from "./AddServiceModal";

interface Service {
  _id?: string;
  name?: string;
  description?: string;
  banner?: string | FileList;
  [key: string]: unknown;
}

const Services = () => {
  const { isReady, push, query } = useRouter();
  const {
    currentLimit,
    currentPage,
    dataService,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
    isLoadingService,
    isRefetchingService,
    refetchService,
    selectedId,
    setSelectedId,
    setURL,
  } = useService();

  const addServiceModal = useDisclosure();
  const deleteServiceModal = useDisclosure();

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
    (service: Record<string, unknown>, columnKey: Key) => {
      const cellValue = service[columnKey as keyof typeof service];

      switch (columnKey) {
        case "banner":
          return (
            <div className="relative h-20 w-32">
              <Image
                alt="banner"
                fill
                src={`${cellValue}`}
                className="rounded-md object-cover"
              />
            </div>
          );
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
                  key="detail-services-button"
                  onPress={() => push(`/admin/service/${service._id}`)}
                >
                  Lihat Layanan
                </DropdownItem>
                <DropdownItem
                  className="text-danger-500"
                  key="delete-services"
                  onPress={() => {
                    setSelectedId(`${service._id}`);
                    deleteServiceModal.onOpen();
                  }}
                >
                  Hapus Layanan
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
  const MobileServiceCard = ({ service }: { service: Service }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Filter kolom yang akan ditampilkan di dropdown (exclude actions dan banner)
    const detailColumns = COLUMN_LIST_SERVICE.filter(
      (col: Record<string, unknown>) =>
        col.uid !== "actions" && col.uid !== "banner",
    );

    return (
      <Card className="mb-4 p-2">
        <CardHeader className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold">
              {String(service.name || "Untitled")}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="light"
              onPress={() => setIsOpen(!isOpen)}
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
                  key={`detail-${service._id}`}
                  onPress={() => push(`/admin/service/${service._id}`)}
                >
                  Lihat Layanan
                </DropdownItem>
                <DropdownItem
                  key={`delete-${service._id}`}
                  className="text-danger-500"
                  onPress={() => {
                    setSelectedId(`${service._id}`);
                    deleteServiceModal.onOpen();
                  }}
                >
                  Hapus Layanan
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>

        {isOpen && (
          <>
            <Divider />
            <CardBody>
              {/* Banner image di mobile */}
              {service.banner && typeof service.banner === "string" && (
                <div className="mb-4">
                  <div className="relative h-40 w-full">
                    <Image
                      alt="banner"
                      fill
                      src={service.banner}
                      className="rounded-md object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Detail informasi */}
              <div className="space-y-3">
                {detailColumns.map((column: Record<string, unknown>) => (
                  <div
                    key={column.uid as string}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="font-medium text-gray-600">
                      {String(column.name)}:
                    </div>
                    <div className="text-gray-900">
                      {renderCell(service, column.uid as Key)}
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
        placeholder="Cari berdasarkan nama"
        startContent={<CiSearch />}
      />
      <Button color="danger" onPress={addServiceModal.onOpen}>
        Tambah Layanan
      </Button>
    </div>
  );

  // Komponen untuk konten bawah (pagination) - HANYA untuk mobile
  const MobileBottomContent = (
    <div className="mt-4 flex items-center justify-center p-8">
      {dataService?.pagination.totalPages > 1 && (
        <Pagination
          color="danger"
          isCompact={shouldUseMobileView}
          onChange={handleChangePage}
          page={Number(currentPage) || 1}
          showControls={!shouldUseMobileView}
          showShadow
          total={dataService?.pagination.totalPages || 1}
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
          {(isLoadingService || isRefetchingService) && (
            <div className="flex h-64 items-center justify-center">
              <Spinner color="danger" size="lg" />
            </div>
          )}

          {/* Empty State */}
          {!isLoadingService && dataService?.data.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">Tidak Ada data layanan.</p>
            </div>
          )}

          {/* Mobile/Tablet View - List Services */}
          {!isLoadingService && dataService?.data.length > 0 && (
            <div className="space-y-4 px-8">
              {dataService.data.map((service: Service) => (
                <MobileServiceCard
                  key={String(service._id)}
                  service={service}
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
          buttonTopContentLabel="Tambah Layanan"
          columns={COLUMN_LIST_SERVICE}
          currentPage={Number(currentPage) || 1}
          data={dataService?.data || []}
          emptyContent="Tidak Ada data layanan."
          isLoading={isLoadingService || isRefetchingService}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addServiceModal.onOpen}
          renderCell={renderCell}
          totalPages={dataService?.pagination.totalPages || 1}
        />
      );
    }
  };

  return (
    <section>
      {renderContent()}

      {/* Modals - Tampil di semua view */}
      <AddServiceModal
        isOpen={addServiceModal.isOpen}
        onClose={addServiceModal.onClose}
        onOpenChange={addServiceModal.onOpenChange}
        refetchService={refetchService}
      />
      <DeleteServiceModal
        isOpen={deleteServiceModal.isOpen}
        onClose={deleteServiceModal.onClose}
        onOpenChange={deleteServiceModal.onOpenChange}
        refetchService={refetchService}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Services;
