import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";
import Home from "./views/Home";
// import DefaultLayout from "@/layouts/default";

const HomePage = () => {
  return (
    <LandingPageLayout title="CV Pandan Sembilan">
      <Home />
    </LandingPageLayout>
  );
};
export default HomePage;
