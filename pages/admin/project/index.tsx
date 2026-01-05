import DashboardLayout from "@/components/layouts/DashboardLayout";
import Projects from "@/pages/views/Admin/Projects";

const ProjectAdminPage = () => {
  return (
    <DashboardLayout
      title="Projects - CV Pandan Sembilan"
      name="Manage Projects"
    >
      <Projects />
    </DashboardLayout>
  );
};

export default ProjectAdminPage;
