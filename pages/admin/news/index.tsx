import DashboardLayout from "@/components/layouts/DashboardLayout";
import News from "@/pages/views/Admin/News";

const NewsAdminPage = () => {
  return (
    <DashboardLayout name="Kelola Berita" title="Berita - CV Pandan Sembilan">
      <News />
    </DashboardLayout>
  );
};

export default NewsAdminPage;
