import { ScrollShadow } from "@heroui/react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";
import News from "@/pages/views/News";

const NewsPage = () => {
  return (
    <>
      <LandingPageLayout title="Berita Terbaru Perusahaan">
        <ScrollShadow className="min-h-screen w-full">
          <News />
        </ScrollShadow>
      </LandingPageLayout>
    </>
  );
};

export default NewsPage;
