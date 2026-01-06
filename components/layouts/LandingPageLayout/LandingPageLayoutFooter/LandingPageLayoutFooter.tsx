import React, { useState } from "react";
import NextLink from "next/link";
import { Input, Button } from "@heroui/react";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const LandingPageLayoutFooter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Use browser's native find functionality
    // @ts-ignore - window.find is not in TypeScript's Window interface but exists in browsers
    if (window.find) {
      // Clear any previous highlights
      if (window.getSelection) {
        window.getSelection()?.removeAllRanges();
      }

      // @ts-ignore
      const found = window.find(
        searchQuery,
        false,
        false,
        true,
        false,
        true,
        false,
      );

      if (!found) {
        alert(`No results found for "${searchQuery}"`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <footer className="w-full bg-[#0077a8] text-white">
      <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h4 className={`${lato.className} mb-4 text-base font-bold`}>
              Tentang CV Pandan Sembilan
            </h4>
            <p
              className={`${lato.className} text-sm leading-relaxed opacity-90`}
            >
              CV Pandan Sembilan Menyediakan jasa perencanaan pembangunan,
              renovasi dan pemeliharaan gedung, perumahan, vila, kost, sekolah,
              mekanikal elektrikal plumbing, ACP (Aluminium Composite Panel),
              jalan raya, dan lain-lain.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <NextLink
                className="transition-transform hover:scale-110 hover:text-white/90"
                href="https://wa.me/+6285102498419"
              >
                <FaWhatsapp size={20} />
              </NextLink>
              <NextLink
                className="transition-transform hover:scale-110 hover:text-white/90"
                href="https://www.instagram.com/p9build.id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              >
                <FaInstagram size={20} />
              </NextLink>
              <NextLink
                className="transition-transform hover:scale-110 hover:text-white/90"
                href="https://linkedin.com"
              >
                <FaLinkedinIn size={20} />
              </NextLink>
              <NextLink
                className="transition-transform hover:scale-110 hover:text-white/90"
                href="https://www.google.com/maps/place/cv.+pandan+sembilan/@-2.9614983,104.7306695,1140m/data=!3m1!1e3!4m15!1m8!3m7!1s0x2e3b753b624a35ab:0x96c7e127bfe9f6cc!2scv.+pandan+sembilan!8m2!3d-2.9614983!4d104.7332444!10e1!16s%2Fg%2F11sqnngp5n!3m5!1s0x2e3b753b624a35ab:0x96c7e127bfe9f6cc!8m2!3d-2.9614983!4d104.7332444!16s%2Fg%2F11sqnngp5n?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
              >
                <FaGoogle size={20} />
              </NextLink>
              <NextLink
                className="transition-transform hover:scale-110 hover:text-white/90"
                href="https://facebook.com"
              >
                <FaFacebookF size={20} />
              </NextLink>
            </div>
          </div>

          <div>
            <h4 className={`${lato.className} mb-4 text-base font-bold`}>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <NextLink
                  className="opacity-90 transition-all hover:translate-x-1 hover:underline hover:opacity-100"
                  href="/company-profile"
                >
                  → Tentang Kami
                </NextLink>
              </li>
              <li>
                <NextLink
                  className="opacity-90 transition-all hover:translate-x-1 hover:underline hover:opacity-100"
                  href="/services"
                >
                  → Layanan Kami
                </NextLink>
              </li>
              <li>
                <NextLink
                  className="opacity-90 transition-all hover:translate-x-1 hover:underline hover:opacity-100"
                  href="/contact"
                >
                  → Kontak Perusahaan
                </NextLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`${lato.className} mb-4 text-base font-bold`}>
              Website
            </h4>
            <a
              className={`${lato.className} text-sm underline opacity-90 transition-opacity hover:opacity-100`}
              href="https://cvpandansembilan.com"
            >
              https://cvpandansembilan.com
            </a>
          </div>

          <div>
            <h4 className={`${lato.className} mb-4 text-base font-bold`}>
              Kontak Kami
            </h4>
            <p className={`${lato.className} mb-4 text-sm opacity-90`}>
              Phone: 0851-0249-8419
            </p>
            <div className="flex items-center gap-2">
              <Input
                classNames={{
                  input: "bg-white text-black",
                  inputWrapper: "bg-white shadow-sm",
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search...."
                radius="full"
                size="sm"
                type="text"
                value={searchQuery}
              />
              <Button
                className="bg-white/20 font-medium text-white hover:bg-white/30"
                onClick={handleSearch}
                radius="full"
                size="sm"
              >
                Go
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-3">
        <div className="mx-auto max-w-full px-4 text-center text-sm font-medium text-[#0077a8] sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          All Rights Reserved. © 2025, CV Pandan Sembilan
        </div>
      </div>
    </footer>
  );
};

export default LandingPageLayoutFooter;
