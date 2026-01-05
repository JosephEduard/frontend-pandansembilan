import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { isPdfUrl } from "@/utils/fileType";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/router";
import useCertification from "@/views/Admin/Certification/useCertification";
import { COLUMN_LIST_CERTIFICATION } from "./Certification.constants";
import AddCertificationModal from "./AddCertificationModal";
import DeleteCertificationModal from "./DeleteCertificationModal";

const Certifications = () => {
  const { push, isReady, query } = useRouter();
  const {
    currentLimit,
    currentPage,
    setURL,
    dataCertification,
    isLoadingCertification,
    isRefetchingCertification,
    refetchCertification,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    selectedId,
    setSelectedId,
  } = useCertification();

  const addCertificationModal = useDisclosure();
  const deleteCertificationModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (certifications: Record<string, unknown>, columnKey: Key) => {
      const cellValue =
        certifications[columnKey as keyof typeof certifications];

      switch (columnKey) {
        case "file": {
          const url = String(cellValue ?? "");
          const isPdf = isPdfUrl(url);
          if (!url) return "";
          if (isPdf) {
            const proxy = `/api/media/proxy?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(String(certifications.title ?? "certificate.pdf"))}`;
            return (
              <a
                href={proxy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 underline"
              >
                Open PDF
              </a>
            );
          }
          return <Image src={url} alt="file" width={100} height={200} />;
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
                  onPress={() =>
                    push(`/admin/certification/${certifications._id}`)
                  }
                >
                  Detail Certifications
                </DropdownItem>
                <DropdownItem
                  key="delete-certifications"
                  className="text-danger-500"
                  onPress={() => {
                    setSelectedId(`${certifications._id}`);
                    deleteCertificationModal.onOpen();
                  }}
                >
                  Delete Certification
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
          buttonTopContentLabel="Tambah Certificate"
          columns={COLUMN_LIST_CERTIFICATION}
          currentPage={Number(currentPage)}
          data={dataCertification?.data || []}
          emptyContent="Tidak Ada data certification."
          isLoading={isLoadingCertification || isRefetchingCertification}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addCertificationModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCertification?.pagination.totalPages}
        />
      )}
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
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCertification={refetchCertification}
      />
    </section>
  );
};
export default Certifications;
