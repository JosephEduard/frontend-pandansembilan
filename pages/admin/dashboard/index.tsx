import Dashboard from "../../views/Admin/Dashboard";

import DashboardLayout from "@/components/layouts/DashboardLayout";

const DashboardAdminPage = () => {
  return (
    <DashboardLayout
      name="Kelola Semua Konten Perusahaan di Sini"
      title="Dashboard Admin CV Pandan Sembilan"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardAdminPage;
