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

import { COLUMN_LIST_CERTIFICATION } from "./Certification.constants";
import AddCertificationModal from "./AddCertificationModal";
import DeleteCertificationModal from "./DeleteCertificationModal";

import useCertification from "@/views/Admin/Certification/useCertification";
import { isPdfUrl } from "@/utils/fileType";
import DataTable from "@/components/ui/DataTable";

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
                className="text-primary-500 underline"
                href={proxy}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open PDF
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
                  className="text-danger-500"
                  key="delete-certifications"
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
        refetchCertification={refetchCertification}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Certifications;
