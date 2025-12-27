import { ScrollShadow } from "@heroui/react";

import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";
// import DefaultLayout from "@/layouts/default";
import Profile from "@/pages/views/Profile";

const CompanyPage = () => {
  return (
    <>
      <LandingPageLayout title="Profil Perusahaan">
        <ScrollShadow className="min-h-screen w-full">
          <Profile />
        </ScrollShadow>
      </LandingPageLayout>
    </>
  );
};

export default CompanyPage;
