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

const Footer = () => {
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

      // Search for the text in the page
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
            <h4 className="mb-4 text-base font-bold">About Us</h4>
            <p className="text-sm leading-relaxed opacity-90">
              CV Pandan Sembilan Menyediakan jasa perencanaan pembangunan,
              renovasi dan pemeliharaan gedung, perumahan, vila, kost, sekolah,
              mekanikal elektrikal plumbing, ACP (Aluminium Composite Panel),
              jalan raya, dan lain-lain.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <NextLink
                href="#"
                className="transition-transform hover:scale-110 hover:text-white/90"
              >
                <FaWhatsapp size={20} />
              </NextLink>
              <NextLink
                href="#"
                className="transition-transform hover:scale-110 hover:text-white/90"
              >
                <FaInstagram size={20} />
              </NextLink>
              <NextLink
                href="#"
                className="transition-transform hover:scale-110 hover:text-white/90"
              >
                <FaLinkedinIn size={20} />
              </NextLink>
              <NextLink
                href="#"
                className="transition-transform hover:scale-110 hover:text-white/90"
              >
                <FaGoogle size={20} />
              </NextLink>
              <NextLink
                href="#"
                className="transition-transform hover:scale-110 hover:text-white/90"
              >
                <FaFacebookF size={20} />
              </NextLink>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <NextLink
                  href="/about"
                  className="opacity-90 transition-all hover:translate-x-1 hover:underline hover:opacity-100"
                >
                  → About Us
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/services"
                  className="opacity-90 transition-all hover:translate-x-1 hover:underline hover:opacity-100"
                >
                  → Our Services
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/contact"
                  className="opacity-90 transition-all hover:translate-x-1 hover:underline hover:opacity-100"
                >
                  → Contact
                </NextLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold">Website</h4>
            <a
              href="https://cvpandansembilan.com"
              className="text-sm underline opacity-90 transition-opacity hover:opacity-100"
            >
              https://cvpandansembilan.com
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold">Contact Us</h4>
            <p className="mb-4 text-sm opacity-90">Phone: 0898-1234-1231</p>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search...."
                size="sm"
                radius="full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                classNames={{
                  input: "bg-white text-black",
                  inputWrapper: "bg-white shadow-sm",
                }}
              />
              <Button
                size="sm"
                radius="full"
                className="bg-white/20 font-medium text-white hover:bg-white/30"
                onClick={handleSearch}
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

export default Footer;
