import { ScrollShadow } from "@heroui/react";

import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";
// import DefaultLayout from "@/layouts/default";

import Services from "@/pages/views/Services";

const CompanyPage = () => {
  return (
    <>
      <LandingPageLayout title="Profil Perusahaan">
        <ScrollShadow className="min-h-screen w-full">
          <Services />
        </ScrollShadow>
      </LandingPageLayout>
    </>
  );
};
export default CompanyPage;
