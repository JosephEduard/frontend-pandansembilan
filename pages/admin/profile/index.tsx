import DashboardLayout from "@/components/layouts/DashboardLayout";

import Profile from "@/pages/views/Admin/Profile/Profile";

const DashboardAdminPage = () => {
  return (
    <DashboardLayout title="Atur Profil Perusahaan - CV Pandan Sembilan">
      <Profile />
    </DashboardLayout>
  );
};

export default DashboardAdminPage;
