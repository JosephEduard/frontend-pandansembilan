import DashboardLayout from "@/components/layouts/DashboardLayout";
import Services from "@/pages/views/Admin/Services";

const ServiceAdminPage = () => {
  return (
    <DashboardLayout
      title="Services - CV Pandan Sembilan"
      name="Manage Services"
    >
      <Services />
    </DashboardLayout>
  );
};

export default ServiceAdminPage;
