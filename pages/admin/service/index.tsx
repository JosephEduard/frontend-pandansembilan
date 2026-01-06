import DashboardLayout from "@/components/layouts/DashboardLayout";
import Services from "@/pages/views/Admin/Services";

const ServiceAdminPage = () => {
  return (
    <DashboardLayout name="Kelola Layanan" title="Layanan - CV Pandan Sembilan">
      <Services />
    </DashboardLayout>
  );
};

export default ServiceAdminPage;
