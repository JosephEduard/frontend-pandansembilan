import DashboardLayout from "@/components/layouts/DashboardLayout";
import Projects from "@/pages/views/Admin/Projects";

const ProjectAdminPage = () => {
  return (
    <DashboardLayout name="Kelola Proyek" title="Proyek - CV Pandan Sembilan">
      <Projects />
    </DashboardLayout>
  );
};

export default ProjectAdminPage;
