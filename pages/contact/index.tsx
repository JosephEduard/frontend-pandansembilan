import { ScrollShadow } from "@heroui/react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout/LandingPageLayout";
import Contact from "@/pages/views/Contact";

const ContactPage = () => {
  return (
    <>
      <LandingPageLayout title="Kontak Perusahaan">
        <ScrollShadow className="min-h-screen w-full">
          <Contact />
        </ScrollShadow>
      </LandingPageLayout>
    </>
  );
};

export default ContactPage;
