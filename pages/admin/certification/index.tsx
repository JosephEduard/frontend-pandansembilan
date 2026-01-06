import DashboardLayout from "@/components/layouts/DashboardLayout";
import Certifications from "@/pages/views/Admin/Certifications";

const CertificationAdminPage = () => {
  return (
    <DashboardLayout
      title="Sertifikasi - CV Pandan Sembilan"
      name="Kelola Sertifikasi"
    >
      <Certifications />
    </DashboardLayout>
  );
};

export default CertificationAdminPage;
