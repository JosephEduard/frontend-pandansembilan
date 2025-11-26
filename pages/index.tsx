import { ScrollShadow } from "@heroui/react";

import { useState, useEffect } from "react";

import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";

import Home from "./views/Home";
import Loading from "@/components/commons/Loading";
// import DefaultLayout from "@/layouts/default";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        // Random increment for realistic feel
        return prev + Math.random() * 20;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} progress={progress} />
      <LandingPageLayout title="CV Pandan Sembilan">
        <ScrollShadow className="min-h-screen w-full">
          <Home />
        </ScrollShadow>
      </LandingPageLayout>
    </>
  );
};
export default HomePage;
