import DashboardLayout from "@/components/layouts/DashboardLayout";
import News from "@/pages/views/Admin/News";

const NewsAdminPage = () => {
  return (
    <DashboardLayout title="News - CV Pandan Sembilan" name="Manage News">
      <News />
    </DashboardLayout>
  );
};

export default NewsAdminPage;
