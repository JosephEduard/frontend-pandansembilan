import { Fragment, ReactNode } from "react";
import { useRouter } from "next/router";

import DashboardLayoutTopbar from "./DashboardLayoutTopbar";
import DashboardLayoutNavbar from "./DashboardLayoutNavbar";

import PageHead from "@/components/commons/PageHead/PageHead";
import LandingPageLayoutFooter from "@/components/layouts/LandingPageLayout/LandingPageLayoutFooter/LandingPageLayoutFooter";
import { cn } from "@/utils/cn";

interface PropTypes {
  title: string;
  children: ReactNode;
}

const DashboardLayout = (props: PropTypes) => {
  const { title, children } = props;
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <Fragment>
      <PageHead title={title} />
      <DashboardLayoutTopbar />
      <DashboardLayoutNavbar />
      <div
        className={cn(
          "max-w-screen-3xl 3xl:container mb-0 pt-0 pb-0",
          isHome ? "pt-0 pb-10 md:pb-6" : "py-10 md:p-6",
        )}
      >
        {children}
      </div>
      <LandingPageLayoutFooter />
    </Fragment>
  );
};

export default DashboardLayout;
