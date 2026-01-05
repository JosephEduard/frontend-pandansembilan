import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Image from "next/image";

import { COLUMN_LIST_SERVICE } from "../../../../constants/Services.constants";

import AddServiceModal from "./AddServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";

import useService from "@/views/Admin/Service/useService";
import DataTable from "@/components/ui/DataTable";

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
            <Image alt="banner" height={200} src={`${cellValue}`} width={100} />
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
                  className="text-danger-500"
                  key="delete-services"
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
        refetchService={refetchService}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Services;
