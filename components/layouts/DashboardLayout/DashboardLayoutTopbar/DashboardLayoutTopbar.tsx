import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { HiPhone, HiLocationMarker, HiOutlineUser } from "react-icons/hi";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import { Lato } from "next/font/google";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { signOut } from "next-auth/react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const DashboardLayoutTopbar = () => {
  const [hidden, setHidden] = useState(false);
  const prevScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > prevScroll.current && current > 50) {
        setHidden(true);
      } else if (current <= 50) {
        setHidden(false);
      }

      prevScroll.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heightClass = "h-7";

  return (
    <>
      <div
        className={`fixed top-0 right-0 left-0 z-50 transform transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="w-full border-b border-[#0b5d85] bg-[#0077a8] text-white">
          <div className="max-w-screen-3xl 3xl:container mx-auto px-3 sm:px-4">
            <div
              className={`flex ${heightClass} items-center justify-between text-sm`}
            >
              {/* Left social icons (desktop only) */}
              <div className="ml-47 hidden items-center gap-3 lg:ml-10 lg:flex xl:ml-22">
                <NextLink
                  className="hover:opacity-90"
                  href="https://wa.me/+6285102498419"
                >
                  <FaWhatsapp />
                </NextLink>
                <NextLink
                  className="hover:opacity-90"
                  href="https://www.instagram.com/p9build.id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                >
                  <FaInstagram />
                </NextLink>
                <NextLink
                  className="hover:opacity-90"
                  href="https://linkedin.com"
                >
                  <FaLinkedinIn />
                </NextLink>
                <NextLink
                  className="hover:opacity-90"
                  href="https://www.google.com/maps/place/cv.+pandan+sembilan/@-2.9614983,104.7306695,1140m/data=!3m1!1e3!4m15!1m8!3m7!1s0x2e3b753b624a35ab:0x96c7e127bfe9f6cc!2scv.+pandan+sembilan!8m2!3d-2.9614983!4d104.7332444!10e1!16s%2Fg%2F11sqnngp5n!3m5!1s0x2e3b753b624a35ab:0x96c7e127bfe9f6cc!8m2!3d-2.9614983!4d104.7332444!16s%2Fg%2F11sqnngp5n?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
                >
                  <FaGoogle />
                </NextLink>
                <NextLink
                  className="hover:opacity-90"
                  href="https://facebook.com"
                >
                  <FaFacebookF />
                </NextLink>
              </div>

              {/* Mobile centered greeting with dropdown */}
              <div className="flex flex-1 items-center justify-center gap-2 lg:hidden">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      size="sm"
                      className="gap-2 px-0 text-white"
                    >
                      <span className={`${lato.className} text-xs sm:text-sm`}>
                        Hi, Admin
                      </span>
                      <HiOutlineUser
                        className={`${lato.className} text-base sm:text-lg`}
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Admin menu" className="min-w-36">
                    <DropdownItem key="logout">
                      <Button
                        color="danger"
                        fullWidth
                        variant="light"
                        className="flex justify-start rounded-lg px-2 py-1.5"
                        size="lg"
                        onPress={() => signOut()}
                      >
                        <CiLogout /> Logout
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              {/* Desktop spacer to push right-side content */}
              <div className="hidden flex-1 lg:flex" />

              {/* Desktop right greeting with dropdown */}
              <div className="mr-37 hidden items-center justify-end gap-2 lg:mr-0 lg:flex lg:w-auto xl:mr-15">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      size="sm"
                      className="gap-2 px-0 text-white"
                    >
                      <span className={`${lato.className} text-xs sm:text-sm`}>
                        Hi, Admin
                      </span>
                      <HiOutlineUser
                        className={`${lato.className} text-base sm:text-lg`}
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Admin menu" className="min-w-36">
                    <DropdownItem key="logout">
                      <Button
                        color="danger"
                        fullWidth
                        variant="light"
                        className="flex justify-start rounded-lg px-2 py-1.5"
                        size="lg"
                        onPress={() => signOut()}
                      >
                        <CiLogout /> Logout
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <div className="w-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* spacer so content (navbar) doesn't jump under the fixed topbar */}
      <div aria-hidden className={heightClass} />
    </>
  );
};

export default DashboardLayoutTopbar;
