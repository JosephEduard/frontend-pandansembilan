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
import NAV_ITEMS from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spacer } from "@heroui/react";

const Chevron = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={16}
    height={16}
    {...props}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [transparent, setTransparent] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero-carousel");
    if (!hero) return; // fallback: keep existing state
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Transparent when hero is intersecting (still visible under navbar)
        setTransparent(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <Navbar
      maxWidth="full"
      height={90}
      className={cn(
        "max-w-screen-3xl 3xl:container mb-0 pt-0 pb-0 transition-colors duration-300",
        transparent
          ? "backdrop-blur-0 bg-transparent shadow-none"
          : "bg-white/95 shadow-md backdrop-blur-sm",
      )}
      isBordered={!transparent}
      isBlurred={false}
    >
      <div className="flex w-full items-center justify-between sm:ml-0 sm:justify-start md:justify-between">
        <NavbarBrand
          as={NextLink}
          href="/"
          className="sm:-flex-auto sm:ml-0 sm:justify-start md:ml-0 md:flex-none lg:ml-5 xl:ml-15 2xl:ml-40"
        >
          <Image
            src="/images/general/logo2.svg"
            alt="Logo"
            width={65}
            height={65}
            className="cursor-pointer"
          />
          <Image
            src={"/images/general/logotext.svg"}
            alt={"LogoText"}
            height={65}
            width={300}
            className="sm:inline-flex-auto ml-2 cursor-pointer md:flex-none"
          />
        </NavbarBrand>
        <Spacer x={32} className="lg:x={0} lg:hidden" />
        <NavbarContent
          className="hidden flex-1 justify-center sm:mr-0 sm:gap-3 md:mr-0 md:gap-4 lg:flex lg:gap-6 xl:mr-20 xl:flex-none xl:gap-10 2xl:mr-40 2xl:gap-15"
          justify="center"
        >
          {NAV_ITEMS.map((item, index) => {
            if (item.label === "COMPANY") {
              return (
                <Dropdown key={`dropdown-${index}`}>
                  <NavbarItem className="p-0">
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className={cn(
                          "text-default-700 hover:text-primary-600 bg-transparent p-0 text-base font-medium data-[hover=true]:bg-transparent",
                          {
                            "text-danger-500 font-bold":
                              router.pathname === item.href,
                          },
                        )}
                        endContent={<Chevron className="ml-0" />}
                        radius="sm"
                        variant="light"
                      >
                        {item.label}
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu aria-label="Company menu">
                    <DropdownItem
                      description="Learn more about us"
                      key="about"
                      onClick={() => router.push("/about")}
                    >
                      About
                    </DropdownItem>
                    <DropdownItem
                      description="See our team"
                      key="team"
                      onClick={() => router.push("/team")}
                    >
                      Team
                    </DropdownItem>
                    <DropdownItem
                      description="Open positions"
                      key="careers"
                      onClick={() => router.push("/careers")}
                    >
                      Careers
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              );
            }

            return (
              <NavbarItem
                key={`${item.label}-${index}`}
                as={NextLink}
                href={item.href}
                className={cn(
                  "text-default-700 hover:text-primary-600 font-medium",
                  {
                    "text-danger-500 font-bold": router.pathname === item.href,
                  },
                )}
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

      <NavbarMenu>
        {NAV_ITEMS.map((item, index) => {
          if (item.label === "COMPANY") {
            return (
              <div key={`mobile-${index}`}>
                <NavbarMenuItem>
                  <button
                    onClick={() => setMobileCompanyOpen((s) => !s)}
                    className={cn(
                      "text-default-700 hover:text-primary-600 w-full text-left text-base font-medium",
                      {
                        "text-danger-500 font-bold":
                          router.pathname === item.href,
                      },
                    )}
                  >
                    <span className="flex w-full items-center justify-between">
                      <span>{item.label}</span>
                      <Chevron
                        className={`ml-0.5 transition-transform ${mobileCompanyOpen ? "-rotate-180" : ""}`}
                      />
                    </span>
                  </button>
                </NavbarMenuItem>

                {mobileCompanyOpen && (
                  <>
                    <NavbarMenuItem>
                      <NextLink
                        href="/about"
                        className="text-default-700 hover:text-primary-600 w-full pl-6 text-base font-medium"
                      >
                        About
                      </NextLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                      <NextLink
                        href="/team"
                        className="text-default-700 hover:text-primary-600 w-full pl-6 text-base font-medium"
                      >
                        Team
                      </NextLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                      <NextLink
                        href="/careers"
                        className="text-default-700 hover:text-primary-600 w-full pl-6 text-base font-medium"
                      >
                        Careers
                      </NextLink>
                    </NavbarMenuItem>
                  </>
                )}
              </div>
            );
          }

          return (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <NextLink
                href={item.href}
                className={cn(
                  "text-default-700 hover:text-primary-600 w-full text-base font-medium",
                  {
                    "text-danger-500 font-bold": router.pathname === item.href,
                  },
                )}
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

export default LandingPageLayoutNavbar;
