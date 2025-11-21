import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";

// import DefaultLayout from "@/layouts/default";
import { ScrollShadow } from "@heroui/react";
import News from "@/pages/views/News";

const NewsPage = () => {
  return (
    <>
      <LandingPageLayout title="Profil Perusahaan">
        <ScrollShadow className="min-h-screen w-full">
          <News />
        </ScrollShadow>
      </LandingPageLayout>
    </>
  );
};
export default NewsPage;
