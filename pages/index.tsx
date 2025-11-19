import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";
import Home from "./views/Home";
// import DefaultLayout from "@/layouts/default";
import { ScrollShadow } from "@heroui/react";

const HomePage = () => {
  return (
    <LandingPageLayout title="CV Pandan Sembilan">
      <ScrollShadow className="min-h-screen w-full">
        <Home />
      </ScrollShadow>
    </LandingPageLayout>
  );
};
export default HomePage;
