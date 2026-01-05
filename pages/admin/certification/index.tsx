import DashboardLayout from "@/components/layouts/DashboardLayout";
import Certifications from "@/pages/views/Admin/Certifications";

const CertificationAdminPage = () => {
  return (
    <DashboardLayout
      title="Certifications - CV Pandan Sembilan"
      name="Manage Certifications"
    >
      <Certifications />
    </DashboardLayout>
  );
};

export default CertificationAdminPage;
