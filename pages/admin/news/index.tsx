import DashboardLayout from "@/components/layouts/DashboardLayout";
import News from "@/pages/views/Admin/News";

const DashboardAdminPage = () => {
  return (
    <DashboardLayout title="News - CV Pandan Sembilan">
      <News />
    </DashboardLayout>
  );
};

export default DashboardAdminPage;
