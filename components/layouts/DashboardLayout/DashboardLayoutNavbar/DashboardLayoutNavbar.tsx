import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@heroui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spacer } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Lato } from "next/font/google";

import NAV_ITEMS from "../DashboardLayout.constant";

import { cn } from "@/utils/cn";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const Chevron = (props: any) => (
  <svg
    fill="none"
    height={16}
    viewBox="0 0 24 24"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const DashboardLayoutNavbar = () => {
  const router = useRouter();
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [transparent, setTransparent] = useState(true);
  const isHome = router.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setTransparent(false);

      return;
    }

    const hero = document.getElementById("hero-carousel");

    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setTransparent(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <Navbar
      className={cn(
        "max-w-screen-3xl 3xl:container mb-0 pt-0 pb-0 transition-colors duration-300",
        transparent
          ? "backdrop-blur-0 bg-transparent shadow-none"
          : "bg-white/95 shadow-md backdrop-blur-sm",
      )}
      height={90}
      isBlurred={false}
      isBordered={!transparent}
      maxWidth="full"
    >
      <div
        className={`${cn(lato.className)} flex w-full items-center justify-between sm:ml-0 sm:justify-start md:justify-between`}
      >
        <NavbarBrand
          as={NextLink}
          className="sm:-flex-auto sm:ml-0 sm:justify-start md:ml-0 md:flex-none lg:mr-8 lg:ml-0 xl:mr-0 xl:ml-15 2xl:ml-40"
          href="/admin"
        >
          <Image
            alt="Logo"
            className="cursor-pointer"
            height={65}
            src="/images/general/logo2.svg"
            width={65}
          />
          <Image
            alt={"LogoText"}
            className="sm:inline-flex-auto ml-2 cursor-pointer md:flex-none"
            height={65}
            src={"/images/general/logotext.svg"}
            width={300}
          />
        </NavbarBrand>
        <Spacer className="lg:x={0} lg:hidden" x={32} />
        <NavbarContent
          className={`${cn(lato.className)} hidden flex-1 justify-center font-bold sm:mr-0 sm:gap-3 md:mr-0 md:gap-4 lg:flex lg:gap-6 xl:mr-20 xl:ml-32 xl:flex-none xl:gap-10 2xl:mr-40 2xl:gap-15`}
          justify="center"
        >
          {NAV_ITEMS.map((item, index) => {
            if (item.label === "PERUSAHAAN") {
              return (
                <Dropdown key={`dropdown-${index}`}>
                  <NavbarItem className="p-0">
                    <DropdownTrigger>
                      <Button
                        className={cn(
                          `${lato.className} hover:text-primary-700 bg-transparent p-0 text-base font-bold data-[hover=true]:bg-transparent`,
                          {
                            "text-danger-500 font-bold":
                              router.pathname === item.href,
                          },
                        )}
                        disableRipple
                        endContent={<Chevron className="ml-0" />}
                        radius="sm"
                        variant="light"
                      >
                        {item.label}
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label="Company menu"
                    className="w-[240px]"
                    itemClasses={{
                      base: "gap-4",
                    }}
                  >
                    <DropdownItem
                      className={`${lato.className} transition-all hover:translate-x-1`}
                      description="Pelajari lebih lanjut tentang kami"
                      key="Company Profile"
                      onClick={() => router.push("/company-profile")}
                    >
                      Profil Perusahaan
                    </DropdownItem>
                    <DropdownItem
                      className={`${lato.className} transition-all hover:translate-x-1`}
                      description="Lihat tujuan kami"
                      key="vision-mission"
                      onClick={() => router.push("/company-profile#vision")}
                    >
                      Visi dan Misi
                    </DropdownItem>
                    <DropdownItem
                      className={`${lato.className} transition-all hover:translate-x-1`}
                      description="Sertifikasi dan legalitas kami"
                      key="certifications"
                      onClick={() =>
                        router.push("/company-profile#certifications")
                      }
                    >
                      Legalitas
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              );
            }

            return (
              <NavbarItem
                as={NextLink}
                className={cn(
                  `${lato.className} hover:text-primary-600 font-bold`,
                  {
                    "text-danger-500 font-bold": router.pathname === item.href,
                  },
                )}
                href={item.href}
                key={`${item.label}-${index}`}
              >
                {item.label}
              </NavbarItem>
            );
          })}
        </NavbarContent>
      </div>

      <NavbarContent className="sm:flex-1 md:flex-none" justify="end">
        <NavbarMenuToggle className="sm:flex-auto md:flex-none lg:hidden" />
      </NavbarContent>

      <NavbarMenu className="pt-6 sm:pt-8 lg:pt-0">
        {NAV_ITEMS.map((item, index) => {
          if (item.label === "  PERUSAHAAN") {
            return (
              <div key={`mobile-${index}`}>
                <NavbarMenuItem>
                  <button
                    className={cn(
                      `${lato.className} font-bold-700 hover:text-primary-600 w-full text-left text-base font-medium`,
                      {
                        "text-danger-500 font-bold":
                          router.pathname === item.href,
                      },
                    )}
                    onClick={() => setMobileCompanyOpen((s) => !s)}
                  >
                    <span className="flex w-full items-center justify-between">
                      <span>{item.label}</span>
                      <Chevron
                        className={`ml-0.5 transition-transform ${mobileCompanyOpen ? "-rotate-180" : ""}`}
                      />
                    </span>
                  </button>
                </NavbarMenuItem>

                <AnimatePresence>
                  {mobileCompanyOpen && (
                    <>
                      <motion.div
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        initial={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <NavbarMenuItem>
                          <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -10 }}
                            transition={{ delay: 0.1 }}
                          >
                            <NextLink
                              className={`${lato.className} hover:text-primary-600 block w-full py-2 pl-6 text-base font-bold transition-all hover:translate-x-1`}
                              href="/company-profile"
                            >
                              Profil Perusahaan
                            </NextLink>
                          </motion.div>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                          <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -10 }}
                            transition={{ delay: 0.15 }}
                          >
                            <NextLink
                              className={`${lato.className} hover:text-primary-600 block w-full py-2 pl-6 text-base font-bold transition-all hover:translate-x-1`}
                              href="/company-profile#vision"
                            >
                              Visi dan Misi
                            </NextLink>
                          </motion.div>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                          <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -10 }}
                            transition={{ delay: 0.2 }}
                          >
                            <NextLink
                              className={`${lato.className} hover:text-primary-700 block w-full py-2 pl-6 text-base font-bold transition-all hover:translate-x-1`}
                              href="/company-profile#certifications"
                            >
                              Legalitas
                            </NextLink>
                          </motion.div>
                        </NavbarMenuItem>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <NextLink
                className={cn(
                  `${lato.className} hover:text-primary-600 w-full text-base font-bold`,
                  {
                    "text-danger-500 font-bold": router.pathname === item.href,
                  },
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default DashboardLayoutNavbar;
