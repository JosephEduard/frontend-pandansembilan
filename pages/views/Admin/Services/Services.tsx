import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, use, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_SERVICE } from "./Services.constants";
import useService from "@/views/Admin/Service/useService";
import AddServiceModal from "./AddServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
import Image from "next/image";

const Services = () => {
  const { push, isReady, query } = useRouter();
  const {
    currentLimit,
    currentPage,
    setURL,
    dataService,
    isLoadingService,
    isRefetchingService,
    refetchService,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    selectedId,
    setSelectedId,
  } = useService();

  const addServiceModal = useDisclosure();
  const deleteServiceModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (services: Record<string, unknown>, columnKey: Key) => {
      const cellValue = services[columnKey as keyof typeof services];

      switch (columnKey) {
        case "banner":
          return (
            <Image src={`${cellValue}`} alt="banner" width={100} height={200} />
          );
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
                  onPress={() => push(`/admin/service/${services._id}`)}
                >
                  Detail Services
                </DropdownItem>
                <DropdownItem
                  key="delete-services"
                  className="text-danger-500"
                  onPress={() => {
                    setSelectedId(`${services._id}`);
                    deleteServiceModal.onOpen();
                  }}
                >
                  Delete Service
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Tambah Service"
          columns={COLUMN_LIST_SERVICE}
          currentPage={Number(currentPage)}
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
          totalPages={dataService?.pagination.totalPages}
        />
      )}
      <AddServiceModal {...addServiceModal} refetchService={refetchService} />
      <DeleteServiceModal
        {...deleteServiceModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchService={refetchService}
      />
    </section>
  );
};
export default Services;
