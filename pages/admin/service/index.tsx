import DashboardLayout from "@/components/layouts/DashboardLayout";
import Services from "@/pages/views/Admin/Services";

const ServiceAdminPage = () => {
  return (
    <DashboardLayout title="Layanan - CV Pandan Sembilan" name="Kelola Layanan">
      <Services />
    </DashboardLayout>
  );
};

export default ServiceAdminPage;
