import Dashboard from "../../views/Admin/Dashboard";

import DashboardLayout from "@/components/layouts/DashboardLayout";

const DashboardAdminPage = () => {
  return (
    <DashboardLayout
      title="Dashboard Admin CV Pandan Sembilan"
      name="Kelola Semua Konten Perusahaan di Sini"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardAdminPage;
