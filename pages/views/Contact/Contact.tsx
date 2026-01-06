import Image from "next/image";
import Link from "next/link";
import { Lato } from "next/font/google";
import { EnvelopeIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Textarea } from "@heroui/input";
import { colorVariants } from "@heroui/theme";
import { Button } from "@heroui/button";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const Contact = () => {
  return (
    <main>
      <section className="dark:bg-darkmode pt-16 pb-0 lg:pt-20 lg:pb-0">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <div className="flex flex-col items-start justify-center gap-8 md:flex-row md:gap-28 lg:items-center">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-8">
              <div className="bg-primary/20 flex h-14 w-14 items-center justify-center rounded-full">
                <EnvelopeIcon
                  aria-hidden="true"
                  className="text-primary h-9 w-9"
                />
              </div>
              <div className="flex h-full flex-col items-start justify-between sm:flex-row sm:items-center md:flex-col md:items-start">
                <div>
                  <span
                    className={`${lato.className} text-secondary text-xl font-bold dark:text-white`}
                  >
                    Email Kami
                  </span>
                  <p
                    className={`${lato.className} text-SlateBlueText dark:text-opacity-80 max-w-80 pt-3 pb-7 text-xl font-normal`}
                  >
                    Jangan ragu untuk menghubungi kami. Kami akan merespons
                    secepat mungkin.
                  </p>
                </div>
                <div>
                  <Link
                    className={`${lato.className} text-primary group hover:text-secondary flex items-center gap-3 text-lg font-medium dark:hover:text-white`}
                    href="#form-contact"
                  >
                    Tinggalkan Pesan
                    <svg
                      className="group-hover:fill-secondary group-hover:dark:fill-white"
                      fill="#2F73F2"
                      height="17"
                      viewBox="0 0 23 17"
                      width="23"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.653 7.76352L15.3613 0.471852C15.1648 0.282104 14.9017 0.177109 14.6286 0.179483C14.3555 0.181856 14.0942 0.291407 13.9011 0.484541C13.7079 0.677674 13.5984 0.938937 13.596 1.21206C13.5936 1.48518 13.6986 1.74831 13.8884 1.94477L19.4019 7.45831H1.08317C0.806904 7.45831 0.541951 7.56806 0.346601 7.76341C0.151251 7.95876 0.0415039 8.22371 0.0415039 8.49998C0.0415039 8.77625 0.151251 9.0412 0.346601 9.23655C0.541951 9.4319 0.806904 9.54165 1.08317 9.54165H19.4019L13.8884 15.0552C13.7889 15.1513 13.7095 15.2662 13.6549 15.3933C13.6003 15.5204 13.5716 15.6571 13.5704 15.7954C13.5692 15.9337 13.5956 16.0709 13.6479 16.1989C13.7003 16.3269 13.7777 16.4432 13.8755 16.541C13.9733 16.6388 14.0896 16.7162 14.2176 16.7685C14.3456 16.8209 14.4828 16.8473 14.6211 16.8461C14.7594 16.8449 14.8961 16.8161 15.0232 16.7615C15.1503 16.707 15.2652 16.6276 15.3613 16.5281L22.653 9.23644C22.8482 9.0411 22.958 8.77619 22.958 8.49998C22.958 8.22377 22.8482 7.95886 22.653 7.76352Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-8">
              <div className="bg-primary/20 flex h-14 w-14 items-center justify-center rounded-full">
                <UserGroupIcon
                  aria-hidden="true"
                  className="text-primary h-9 w-9"
                />
              </div>
              <div className="flex h-full flex-col items-start justify-between sm:flex-row sm:items-center md:flex-col md:items-start">
                <div>
                  <span
                    className={`${lato.className} text-secondary text-xl font-bold dark:text-white`}
                  >
                    Whatsapp Kami
                  </span>
                  <p
                    className={`${lato.className} text-SlateBlueText dark:text-opacity-80 max-w-80 pt-3 pb-7 text-xl font-normal`}
                  >
                    Segera hubungi kami langsung melalui WhatsApp untuk respon
                    cepat.
                  </p>
                </div>
                <div>
                  <Link
                    className={`${lato.className} text-primary group hover:text-secondary flex items-center gap-3 text-lg font-medium dark:hover:text-white`}
                    href="https://wa.me/+6285102498419"
                  >
                    Kontak Whatsapp
                    <svg
                      className="group-hover:fill-secondary group-hover:dark:fill-white"
                      fill="#2F73F2"
                      height="17"
                      viewBox="0 0 23 17"
                      width="23"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.653 7.76352L15.3613 0.471852C15.1648 0.282104 14.9017 0.177109 14.6286 0.179483C14.3555 0.181856 14.0942 0.291407 13.9011 0.484541C13.7079 0.677674 13.5984 0.938937 13.596 1.21206C13.5936 1.48518 13.6986 1.74831 13.8884 1.94477L19.4019 7.45831H1.08317C0.806904 7.45831 0.541951 7.56806 0.346601 7.76341C0.151251 7.95876 0.0415039 8.22371 0.0415039 8.49998C0.0415039 8.77625 0.151251 9.0412 0.346601 9.23655C0.541951 9.4319 0.806904 9.54165 1.08317 9.54165H19.4019L13.8884 15.0552C13.7889 15.1513 13.7095 15.2662 13.6549 15.3933C13.6003 15.5204 13.5716 15.6571 13.5704 15.7954C13.5692 15.9337 13.5956 16.0709 13.6479 16.1989C13.7003 16.3269 13.7777 16.4432 13.8755 16.541C13.9733 16.6388 14.0896 16.7162 14.2176 16.7685C14.3456 16.8209 14.4828 16.8473 14.6211 16.8461C14.7594 16.8449 14.8961 16.8161 15.0232 16.7615C15.1503 16.707 15.2652 16.6276 15.3613 16.5281L22.653 9.23644C22.8482 9.0411 22.958 8.77619 22.958 8.49998C22.958 8.22377 22.8482 7.95886 22.653 7.76352Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-11 pb-16 md:pt-28 md:pb-28">
            <iframe
              className="w-full rounded-lg"
              height="477"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9027.359772204685!2d104.7306695!3d-2.9614983!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b753b624a35ab%3A0x96c7e127bfe9f6cc!2scv.%20pandan%20sembilan!5e1!3m2!1sen!2sid!4v1764122843068!5m2!1sen!2sid"
              title="Google Map"
              width="1114"
            />
          </div>
        </div>
      </section>
      <section
        className="dark:bg-darkmode bg-gray-50 pt-20 pb-16 lg:pb-24"
        id="form-contact"
      >
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="col-span-6">
              <h2
                className={`${lato.className} text-secondary mb-3 max-w-72 text-[35px] leading-[3.4rem] font-bold`}
              >
                Dapatkan Konsultasi Daring
              </h2>
              <form className="m-auto flex w-full flex-wrap justify-between">
                <div className="w-full gap-3 sm:flex">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                      htmlFor="first-name"
                    >
                      Nama Depan*
                    </label>
                    <input
                      className={`${lato.className} border-border dark:border-dark_border dark:bg-darkmode focus:border-primary dark:focus:border-primary w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-solid focus:outline-0 dark:text-white`}
                      id="first-name"
                      type="text"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                      htmlFor="last-name"
                    >
                      Nama Belakang*
                    </label>
                    <input
                      className={`${lato.className} border-border dark:border-dark_border dark:bg-darkmode focus:border-primary dark:focus:border-primary w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-solid focus:outline-0 dark:text-white`}
                      id="last-name"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full gap-3 sm:flex">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                      htmlFor="email"
                    >
                      Alamat Email*
                    </label>
                    <input
                      className={`${lato.className} border-border dark:border-dark_border dark:bg-darkmode focus:border-primary dark:focus:border-primary w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-solid focus:outline-0 dark:text-white`}
                      id="email"
                      type="email"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                      htmlFor="date"
                    >
                      Tanggal*
                    </label>
                    <input
                      className={`${lato.className} text-SlateBlueText dark:bg-darkmode border-border focus:border-primary dark:focus:border-primary dark:border-dark_border w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 outline-none focus:border-solid focus:outline-0 dark:text-white`}
                      id="date"
                      type="date"
                    />
                  </div>
                </div>
                <div className="w-full gap-3 sm:flex">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                      htmlFor="message"
                    >
                      Pesan*
                    </label>
                    <Textarea
                      className={`${lato.className} w-full text-base transition-all duration-500`}
                      id="message"
                      type="text"
                      variant="bordered"
                    />
                  </div>
                </div>
                <div className="mx-0 my-2.5 w-full">
                  <Button
                    className={`${lato.className} hover-filled-slide-down bg-primary mt-4 w-1/4 overflow-hidden rounded-lg text-white`}
                    href="#"
                    type="submit"
                  >
                    <span>Kirim Email</span>
                  </Button>
                </div>
              </form>
            </div>
            <div className="col-span-6">
              <Image
                alt="Contact"
                className="rounded-lg bg-contain bg-no-repeat"
                height={0}
                quality={100}
                src="/images/general/construction.jpg"
                style={{ width: "100%", height: "auto" }}
                width={1400}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
