import DashboardLayout from "@/components/layouts/DashboardLayout";
import Certifications from "@/pages/views/Admin/Certifications";

const CertificationAdminPage = () => {
  return (
    <DashboardLayout
      name="Kelola Sertifikasi"
      title="Sertifikasi - CV Pandan Sembilan"
    >
      <Certifications />
    </DashboardLayout>
  );
};

export default CertificationAdminPage;
