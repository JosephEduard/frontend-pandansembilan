import { Lato } from "next/font/google";
import { ReactNode, useContext, useEffect } from "react";
import Toaster from "@/components/ui/Toaster";
import { defaultToaster, ToasterContext } from "@/contexts/ToasterContext";
import { cn } from "@/utils/cn";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

interface PropTypes {
  children: ReactNode;
}

const AppShell = (props: PropTypes) => {
  const { children } = props;
  const { setToaster, toaster } = useContext(ToasterContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToaster(defaultToaster);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [toaster]);

  return (
    <main className={cn(lato.className)}>
      {children}
      {toaster.type !== "" && (
        <Toaster message={toaster.message} type={toaster.type} />
      )}
    </main>
  );
};

export default AppShell;
