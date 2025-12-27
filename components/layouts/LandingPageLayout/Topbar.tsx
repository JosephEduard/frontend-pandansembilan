import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";
import { HiPhone, HiLocationMarker } from "react-icons/hi";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export default function Topbar() {
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

  const heightClass = "h-9";

  return (
    <>
      <div
        className={`fixed top-0 right-0 left-0 z-50 transform transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="w-full bg-[#0077a8] text-white">
          <div className="max-w-screen-3xl 3xl:container mx-auto px-3 sm:px-4">
            <div
              className={`flex ${heightClass} items-center justify-between text-sm`}
            >
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

              <div className="flex-1">
                <div className={`${lato.className} w-full text-center`}>
                  <span className={`${lato.className} text-sm font-medium`}>
                    Building Constructions - Supplier - ETC
                  </span>
                </div>
              </div>

              <div className="mr-37 hidden items-center justify-end gap-6 lg:mr-0 lg:flex lg:w-auto xl:mr-15">
                <div className="flex items-center gap-2">
                  <HiPhone className={`${lato.className} text-lg`} />
                  <span
                    className={`${lato.className} text-sm whitespace-nowrap`}
                  >
                    0851-0249-8419
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiLocationMarker className={`${lato.className} text-lg`} />
                  <span
                    className={`${lato.className} text-sm whitespace-nowrap`}
                  >
                    Palembang - Indonesia
                  </span>
                </div>
                <div className="w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* spacer so content (navbar) doesn't jump under the fixed topbar */}
      <div aria-hidden className={heightClass} />
    </>
  );
}
