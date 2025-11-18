import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import Image from "next/image";
import Link from "next/link";
import NAV_ITEMS from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  return (
    <Navbar
      maxWidth="full"
      className="max-w-screen-3xl 3xl:container"
      isBordered
      isBlurred={false}
      shouldHideOnScroll
    >
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/general/logo2.png"
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent>
          {NAV_ITEMS.map((item, index) => (
            <NavbarItem
              key={`${item.label}-${index}`}
              as={Link}
              href={item.href}
              className={cn(
                "text-default-700 hover:text-primary-600 font-medium",
                {
                  "textt-danger-500 font-bold": router.pathname === item.href,
                },
              )}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
