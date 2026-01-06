import { ScrollShadow } from "@heroui/react";

import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";
import Portofolio from "@/pages/views/Portofolio";

const PortfolioPage = () => {
  return (
    <>
      <LandingPageLayout title="Portofolio Perusahaan">
        <ScrollShadow className="min-h-screen w-full">
          <Portofolio />
        </ScrollShadow>
      </LandingPageLayout>
    </>
  );
};

export default PortfolioPage;
