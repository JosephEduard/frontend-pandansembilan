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
import useNews from "@/views/Admin/News/useNews";
import { COLUMN_LIST_NEWS } from "@/constants/News.constants";
import AddNewsModal from "./AddNewsModal";
import DeleteNewsModal from "./DeleteNewsModal";

interface News {
  _id?: string;
  title?: string;
  text?: string;
  image?: string | FileList;
  date?: string | Date;
  [key: string]: unknown;
}

const News = () => {
  const { isReady, push, query } = useRouter();
  const {
    currentLimit,
    currentPage,
    dataNews,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
    isLoadingNews,
    isRefetchingNews,
    refetchNews,
    selectedId,
    setSelectedId,
    setURL,
  } = useNews();

  const addNewsModal = useDisclosure();
  const deleteNewsModal = useDisclosure();

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
    (news: Record<string, unknown>, columnKey: Key) => {
      const cellValue = news[columnKey as keyof typeof news];

      switch (columnKey) {
        case "image":
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
        case "date": {
          const v = cellValue as unknown as string | Date | undefined;

          if (!v) return "";
          try {
            const d = typeof v === "string" ? new Date(v) : (v as Date);

            if (isNaN(d.getTime())) return String(v);

            // Short format: 06/01/2026 14:20 WIB (Asia/Jakarta)
            const datePart = new Intl.DateTimeFormat("id-ID", {
              timeZone: "Asia/Jakarta",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(d);
            const timePart = new Intl.DateTimeFormat("id-ID", {
              timeZone: "Asia/Jakarta",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(d);

            // Indonesian locale uses a dot between hour and minute (e.g., 14.20).
            // Replace with colon for consistency across UI.
            const normalizedTime = timePart.replace(".", ":");
            return `${datePart} ${normalizedTime} WIB`;
          } catch {
            return String(v);
          }
        }
        case "text": {
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
                  key="detail-news-button"
                  onPress={() => push(`/admin/news/${news._id}`)}
                >
                  Lihat Berita
                </DropdownItem>
                <DropdownItem
                  className="text-danger-500"
                  key="delete-news"
                  onPress={() => {
                    setSelectedId(`${news._id}`);
                    deleteNewsModal.onOpen();
                  }}
                >
                  Hapus Berita
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
  const MobileNewsCard = ({ news }: { news: News }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Filter kolom yang akan ditampilkan di dropdown (exclude actions dan banner)
    const detailColumns = COLUMN_LIST_NEWS.filter(
      (col: Record<string, unknown>) =>
        col.uid !== "actions" && col.uid !== "image",
    );

    return (
      <Card className="mb-4 p-2">
        <CardHeader className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold">
              {String(news.title || "Untitled")}
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
                  key={`detail-${news._id}`}
                  onPress={() => push(`/admin/news/${news._id}`)}
                >
                  Lihat Berita
                </DropdownItem>
                <DropdownItem
                  key={`delete-${news._id}`}
                  className="text-danger-500"
                  onPress={() => {
                    setSelectedId(`${news._id}`);
                    deleteNewsModal.onOpen();
                  }}
                >
                  Hapus Berita
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
              {news.image && typeof news.image === "string" && (
                <div className="mb-4">
                  <div className="relative h-40 w-full">
                    <Image
                      alt="banner"
                      fill
                      src={news.image}
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
                      {renderCell(news, column.uid as Key)}
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
      <Button color="danger" onPress={addNewsModal.onOpen}>
        Tambah Berita
      </Button>
    </div>
  );

  // Komponen untuk konten bawah (pagination) - HANYA untuk mobile
  const MobileBottomContent = (
    <div className="mt-4 flex items-center justify-center p-8">
      {dataNews?.pagination.totalPages > 1 && (
        <Pagination
          color="danger"
          isCompact={shouldUseMobileView}
          onChange={handleChangePage}
          page={Number(currentPage) || 1}
          showControls={!shouldUseMobileView}
          showShadow
          total={dataNews?.pagination.totalPages || 1}
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
          {(isLoadingNews || isRefetchingNews) && (
            <div className="flex h-64 items-center justify-center">
              <Spinner color="danger" size="lg" />
            </div>
          )}

          {/* Empty State */}
          {!isLoadingNews && dataNews?.data.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">Tidak Ada data berita.</p>
            </div>
          )}

          {/* Mobile/Tablet View - List News */}
          {!isLoadingNews && dataNews?.data.length > 0 && (
            <div className="space-y-4 px-8">
              {dataNews.data.map((news: News) => (
                <MobileNewsCard key={String(news._id)} news={news} />
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
          buttonTopContentLabel="Tambah Berita"
          columns={COLUMN_LIST_NEWS}
          currentPage={Number(currentPage) || 1}
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
          totalPages={dataNews?.pagination.totalPages || 1}
        />
      );
    }
  };

  return (
    <section>
      {renderContent()}

      {/* Modals - Tampil di semua view */}
      <AddNewsModal
        isOpen={addNewsModal.isOpen}
        onClose={addNewsModal.onClose}
        onOpenChange={addNewsModal.onOpenChange}
        refetchNews={refetchNews}
      />
      <DeleteNewsModal
        isOpen={deleteNewsModal.isOpen}
        onClose={deleteNewsModal.onClose}
        onOpenChange={deleteNewsModal.onOpenChange}
        refetchNews={refetchNews}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default News;
