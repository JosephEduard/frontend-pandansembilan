import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { Key, useCallback, useEffect, useState } from "react";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { useRouter } from "next/router";

import { COLUMN_LIST_CERTIFICATION } from "../../../../constants/Certification.constants";

import AddCertificationModal from "./AddCertificationModal";
import DeleteCertificationModal from "./DeleteCertificationModal";

import useCertification from "@/views/Admin/Certification/useCertification";
import { isPdfUrl } from "@/utils/fileType";
import DataTable from "@/components/ui/DataTable";
import useMediaQuery from "@/hooks/useMediaQuery";

const Certifications = () => {
  const { isReady, push, query } = useRouter();
  const {
    currentLimit,
    currentPage,
    dataCertification,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
    isLoadingCertification,
    isRefetchingCertification,
    refetchCertification,
    selectedId,
    setSelectedId,
    setURL,
  } = useCertification();

  const addCertificationModal = useDisclosure();
  const deleteCertificationModal = useDisclosure();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const shouldUseMobileView = isMobile || isTablet;

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      const cellValue = item[columnKey as keyof typeof item];

      switch (columnKey) {
        case "file": {
          const url = String(cellValue ?? "");
          const isPdf = isPdfUrl(url);

          if (!url) return "";
          if (isPdf) {
            const proxy = `/api/media/proxy?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(String(item.title ?? "certificate.pdf"))}`;

            return (
              <a
                className="text-primary-500 underline"
                href={proxy}
                rel="noopener noreferrer"
                target="_blank"
              >
                Buka PDF
              </a>
            );
          }

          return <Image alt="file" height={200} src={url} width={100} />;
        }
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
        case "status": {
          const statusBool = cellValue as unknown as boolean | string;

          if (statusBool === true || statusBool === "true") {
            return "Valid";
          } else if (statusBool === false || statusBool === "false") {
            return "Tidak Valid";
          } else {
            return "Tidak Valid";
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
                  key="detail-certifications-button"
                  onPress={() => push(`/admin/certification/${item._id}`)}
                >
                  Lihat Sertifikat
                </DropdownItem>
                <DropdownItem
                  className="text-danger-500"
                  key="delete-certifications"
                  onPress={() => {
                    setSelectedId(String(item._id ?? ""));
                    deleteCertificationModal.onOpen();
                  }}
                >
                  Hapus Sertifikat
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default: {
          if (cellValue === null || cellValue === undefined) return "";
          const t = typeof cellValue;

          if (t === "object") return "";

          return String(cellValue);
        }
      }
    },
    [push],
  );

  const MobileCertificationCard = ({ item }: { item: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const detailColumns = COLUMN_LIST_CERTIFICATION.filter(
      (col: Record<string, unknown>) =>
        col.uid !== "actions" && col.uid !== "file",
    );
    const fileUrl = String(item.file ?? "");
    const fileIsPdf = isPdfUrl(fileUrl);

    return (
      <Card className="mb-4 p-2">
        <CardHeader className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold">
              {String(item.title ?? "Untitled")}
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
                  key={`detail-${String(item._id ?? "")}`}
                  onPress={() =>
                    push(`/admin/certification/${String(item._id ?? "")}`)
                  }
                >
                  Lihat Sertifikat
                </DropdownItem>
                <DropdownItem
                  className="text-danger-500"
                  key={`delete-${String(item._id ?? "")}`}
                  onPress={() => {
                    setSelectedId(String(item._id ?? ""));
                    deleteCertificationModal.onOpen();
                  }}
                >
                  Hapus Sertifikat
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>

        {isOpen && (
          <>
            <Divider />
            <CardBody>
              {fileUrl && (
                <div className="mb-4">
                  {fileIsPdf ? (
                    <a
                      className="text-primary-500 underline"
                      href={`/api/media/proxy?url=${encodeURIComponent(fileUrl)}&filename=${encodeURIComponent(String(item.title ?? "certificate.pdf"))}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Buka PDF
                    </a>
                  ) : (
                    <div className="relative h-40 w-full">
                      <Image
                        alt="file"
                        className="rounded-md object-cover"
                        fill
                        src={fileUrl}
                      />
                    </div>
                  )}
                </div>
              )}

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
                      {renderCell(item, column.uid as Key)}
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
      <Button color="danger" onPress={addCertificationModal.onOpen}>
        Tambah Sertifikat
      </Button>
    </div>
  );

  const MobileBottomContent = (
    <div className="mt-4 flex items-center justify-center p-8">
      {dataCertification?.pagination.totalPages > 1 && (
        <Pagination
          color="danger"
          isCompact={shouldUseMobileView}
          onChange={handleChangePage}
          page={Number(currentPage) || 1}
          showControls={!shouldUseMobileView}
          showShadow
          total={dataCertification?.pagination.totalPages || 1}
        />
      )}
    </div>
  );

  return (
    <section>
      {Object.keys(query).length > 0 &&
        (shouldUseMobileView ? (
          <>
            {MobileTopContent}

            {(isLoadingCertification || isRefetchingCertification) && (
              <div className="flex h-64 items-center justify-center">
                <Spinner color="danger" size="lg" />
              </div>
            )}

            {!isLoadingCertification &&
              dataCertification?.data.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-gray-500">Tidak Ada data sertifikat.</p>
                </div>
              )}

            {!isLoadingCertification && dataCertification?.data.length > 0 && (
              <div className="space-y-4 px-8">
                {dataCertification.data.map((item: any) => (
                  <MobileCertificationCard item={item} key={String(item._id)} />
                ))}

                {MobileBottomContent}
              </div>
            )}
          </>
        ) : (
          <DataTable
            buttonTopContentLabel="Tambah Sertifikat"
            columns={COLUMN_LIST_CERTIFICATION}
            currentPage={Number(currentPage) || 1}
            data={dataCertification?.data || []}
            emptyContent="Tidak Ada data sertifikat."
            isLoading={isLoadingCertification || isRefetchingCertification}
            limit={String(currentLimit)}
            onChangeLimit={handleChangeLimit}
            onChangePage={handleChangePage}
            onChangeSearch={handleSearch}
            onClearSearch={handleClearSearch}
            onClickButtonTopContent={addCertificationModal.onOpen}
            renderCell={renderCell}
            totalPages={dataCertification?.pagination.totalPages || 1}
          />
        ))}
      <AddCertificationModal
        isOpen={addCertificationModal.isOpen}
        onClose={addCertificationModal.onClose}
        onOpenChange={addCertificationModal.onOpenChange}
        refetchCertification={refetchCertification}
      />
      <DeleteCertificationModal
        isOpen={deleteCertificationModal.isOpen}
        onClose={deleteCertificationModal.onClose}
        onOpenChange={deleteCertificationModal.onOpenChange}
        refetchCertification={refetchCertification}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Certifications;
