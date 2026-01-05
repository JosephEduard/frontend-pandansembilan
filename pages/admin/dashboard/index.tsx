import Dashboard from "../../views/Admin/Dashboard";

import DashboardLayout from "@/components/layouts/DashboardLayout";

const DashboardAdminPage = () => {
  return (
    <DashboardLayout
      title="Dashboard Admin CV Pandan Sembilan"
      name="Manage All Company Data Here"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardAdminPage;
