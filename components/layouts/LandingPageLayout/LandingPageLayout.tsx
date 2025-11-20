import PageHead from "@/components/commons/PageHead/PageHead";
import { title } from "@/components/primitives";
import { Fragment, ReactNode } from "react";
import Topbar from "./Topbar";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import Footer from "@/components/commons/Footer/Footer";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";

interface PropTypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { title, children } = props;
  const router = useRouter();
  const isHome = router.pathname === "/";
  return (
    <Fragment>
      <PageHead title={title} />
      <Topbar />
      <LandingPageLayoutNavbar />
      <div
        className={cn(
          "max-w-screen-3xl 3xl:container mb-0 pt-0 pb-0",
          isHome ? "pt-0 pb-10 md:pb-6" : "py-10 md:p-6",
        )}
      >
        {children}
      </div>
      <Footer />
    </Fragment>
  );
};

export default LandingPageLayout;
