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
import { COLUMN_LIST_NEWS } from "./News.constants";
import Image from "next/image";
import useNews from "@/views/Admin/News/useNews";
import AddNewsModal from "./AddNewsModal";
import DeleteNewsModal from "./DeleteNewsModal";

const News = () => {
  const { push, isReady, query } = useRouter();
  const {
    currentLimit,
    currentPage,
    setURL,
    dataNews,
    isLoadingNews,
    isRefetchingNews,
    refetchNews,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    selectedId,
    setSelectedId,
  } = useNews();

  const addNewsModal = useDisclosure();
  const deleteNewsModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (news: Record<string, unknown>, columnKey: Key) => {
      const cellValue = news[columnKey as keyof typeof news];

      switch (columnKey) {
        case "date": {
          const v = cellValue as unknown as string | Date | undefined;
          if (!v) return "";
          const d = typeof v === "string" ? new Date(v) : (v as Date);
          if (isNaN(d.getTime())) return String(v);
          return d.toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        }
        case "image":
          return (
            <Image src={`${cellValue}`} alt="image" width={100} height={200} />
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
                  key="detail-news-button"
                  onPress={() => push(`/admin/news/${news._id}`)}
                >
                  Detail News
                </DropdownItem>
                <DropdownItem
                  key="delete-news"
                  className="text-danger-500"
                  onPress={() => {
                    setSelectedId(`${news._id}`);
                    deleteNewsModal.onOpen();
                  }}
                >
                  Delete News
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
          buttonTopContentLabel="Tambah News"
          columns={COLUMN_LIST_NEWS}
          currentPage={Number(currentPage)}
          data={dataNews?.data || []}
          emptyContent="Tidak Ada data berita."
          isLoading={isLoadingNews || isRefetchingNews}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addNewsModal.onOpen}
          renderCell={renderCell}
          totalPages={dataNews?.pagination.totalPages}
        />
      )}
      <AddNewsModal {...addNewsModal} refetchNews={refetchNews} />
      <DeleteNewsModal
        {...deleteNewsModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchNews={refetchNews}
      />
    </section>
  );
};
export default News;
