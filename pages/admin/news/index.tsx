import DashboardLayout from "@/components/layouts/DashboardLayout";
import News from "@/pages/views/Admin/News";

const NewsAdminPage = () => {
  return (
    <DashboardLayout title="Berita - CV Pandan Sembilan" name="Kelola Berita">
      <News />
    </DashboardLayout>
  );
};

export default NewsAdminPage;
