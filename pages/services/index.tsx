import { ScrollShadow } from "@heroui/react";

import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";
import Services from "@/pages/views/Services";

const CompanyPage = () => {
  return (
    <>
      <LandingPageLayout title="Layanan Perusahaan">
        <ScrollShadow className="min-h-screen w-full">
          <Services />
        </ScrollShadow>
      </LandingPageLayout>
    </>
  );
};

export default CompanyPage;
