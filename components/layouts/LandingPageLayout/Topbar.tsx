import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";
import { HiPhone, HiLocationMarker } from "react-icons/hi";
import NextLink from "next/link";

export default function Topbar() {
  return (
    <div className="w-full bg-[#0077a8] text-white">
      <div className="max-w-screen-3xl 3xl:container mx-auto px-4">
        <div className="flex h-9 items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <NextLink href="#" className="hover:opacity-90">
              <FaWhatsapp />
            </NextLink>
            <NextLink href="#" className="hover:opacity-90">
              <FaInstagram />
            </NextLink>
            <NextLink href="#" className="hover:opacity-90">
              <FaLinkedinIn />
            </NextLink>
            <NextLink href="#" className="hover:opacity-90">
              <FaGoogle />
            </NextLink>
            <NextLink href="#" className="hover:opacity-90">
              <FaFacebookF />
            </NextLink>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <HiPhone className="text-lg" />
              <span>0898-1234-1231</span>
            </div>
            <div className="flex items-center gap-2">
              <HiLocationMarker className="text-lg" />
              <span>Palembang - Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
