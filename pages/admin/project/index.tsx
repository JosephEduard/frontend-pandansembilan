import DashboardLayout from "@/components/layouts/DashboardLayout";
import Projects from "@/pages/views/Admin/Projects";

const ProjectAdminPage = () => {
  return (
    <DashboardLayout title="Proyek - CV Pandan Sembilan" name="Kelola Proyek">
      <Projects />
    </DashboardLayout>
  );
};

export default ProjectAdminPage;
