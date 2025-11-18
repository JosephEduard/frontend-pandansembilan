import PageHead from "@/components/commons/PageHead/PageHead";
import { title } from "@/components/primitives";
import { Fragment, ReactNode } from "react";
import Topbar from "./Topbar";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";

interface PropTypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <Topbar />
      <LandingPageLayoutNavbar />
      <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
        {children}
      </div>
    </Fragment>
  );
};

export default LandingPageLayout;
