import Image from "next/image";
import Link from "next/link";
import { Lato } from "next/font/google";
import { EnvelopeIcon, UserGroupIcon } from "@heroicons/react/24/solid";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const Contact = () => {
  return (
    <main>
      <section className="dark:bg-darkmode pt-16 pb-10 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <div className="flex flex-col items-start justify-center gap-8 md:flex-row md:gap-28 lg:items-center">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-8">
              <div className="bg-primary/20 flex h-14 w-14 items-center justify-center rounded-full">
                <EnvelopeIcon
                  className="text-primary h-9 w-9"
                  aria-hidden="true"
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
                    href="#"
                    className={`${lato.className} text-primary group hover:text-secondary flex items-center gap-3 text-lg font-medium dark:hover:text-white`}
                  >
                    Tinggalkan Pesan
                    <svg
                      width="23"
                      height="17"
                      viewBox="0 0 23 17"
                      fill="#2F73F2"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:fill-secondary group-hover:dark:fill-white"
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
                  className="text-primary h-9 w-9"
                  aria-hidden="true"
                />
              </div>
              <div className="flex h-full flex-col items-start justify-between sm:flex-row sm:items-center md:flex-col md:items-start">
                <div>
                  <span
                    className={`${lato.className} text-secondary text-xl font-bold dark:text-white`}
                  >
                    Karir
                  </span>
                  <p
                    className={`${lato.className} text-SlateBlueText dark:text-opacity-80 max-w-80 pt-3 pb-7 text-xl font-normal`}
                  >
                    Bergabunglah dengan tim kami dan kembangkan karier Anda
                    bersama perusahaan yang terus bertumbuh.
                  </p>
                </div>
                <div>
                  <Link
                    href="#"
                    className={`${lato.className} text-primary group hover:text-secondary flex items-center gap-3 text-lg font-medium dark:hover:text-white`}
                  >
                    Kirim lamaran Kerja
                    <svg
                      width="23"
                      height="17"
                      viewBox="0 0 23 17"
                      fill="#2F73F2"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:fill-secondary group-hover:dark:fill-white"
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
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9027.359772204685!2d104.7306695!3d-2.9614983!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b753b624a35ab%3A0x96c7e127bfe9f6cc!2scv.%20pandan%20sembilan!5e1!3m2!1sen!2sid!4v1764122843068!5m2!1sen!2sid"
              width="1114"
              height="477"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-lg"
              title="Google Map"
            ></iframe>
          </div>
        </div>
        <div className="dark:border-dark_border border-b border-solid"></div>
      </section>
      <section className="dark:bg-darkmode pt-0 pb-16 lg:pb-24">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="col-span-6">
              <h2
                className={`${lato.className} text-secondary mb-9 max-w-72 text-[40px] leading-[3.4rem] font-bold`}
              >
                Get Online Consultation
              </h2>
              <form className="m-auto flex w-full flex-wrap justify-between">
                <div className="w-full gap-3 sm:flex">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="first-name"
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                    >
                      First Name*
                    </label>
                    <input
                      id="first-name"
                      className={`${lato.className} border-border dark:border-dark_border dark:bg-darkmode focus:border-primary dark:focus:border-primary w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-solid focus:outline-0 dark:text-white`}
                      type="text"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="last-name"
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                    >
                      Last Name*
                    </label>
                    <input
                      id="last-name"
                      className={`${lato.className} border-border dark:border-dark_border dark:bg-darkmode focus:border-primary dark:focus:border-primary w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-solid focus:outline-0 dark:text-white`}
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full gap-3 sm:flex">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="email"
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                    >
                      Email address*
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`${lato.className} border-border dark:border-dark_border dark:bg-darkmode focus:border-primary dark:focus:border-primary w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-solid focus:outline-0 dark:text-white`}
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="Specialist"
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                    >
                      Specialist*
                    </label>
                    <select
                      id="Specialist"
                      className={`${lato.className} text-SlateBlueText border-border dark:bg-darkmode focus:border-primary dark:focus:border-primary dark:border-dark_border w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-solid focus:outline-0 dark:text-white`}
                    >
                      <option value="">Choose a specialist</option>
                      <option value="Baking &amp; Pastry">
                        Choose a specialist
                      </option>
                      <option value="Exotic Cuisine">Exotic Cuisine</option>
                      <option value="French Desserts">French Desserts</option>
                      <option value="Seafood &amp; Wine">
                        Choose a specialist
                      </option>
                    </select>
                  </div>
                </div>
                <div className="w-full gap-3 sm:flex">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="date"
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                    >
                      Date*
                    </label>
                    <input
                      id="date"
                      className={`${lato.className} text-SlateBlueText dark:bg-darkmode border-border focus:border-primary dark:focus:border-primary dark:border-dark_border w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 outline-none focus:border-solid focus:outline-0 dark:text-white`}
                      type="date"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="time"
                      className={`${lato.className} text-SlateBlueText inline-block pb-3 text-base`}
                    >
                      Time*
                    </label>
                    <input
                      id="time"
                      className={`${lato.className} border-border dark:bg-darkmode focus:border-primary dark:focus:border-primary dark:border-dark_border w-full rounded-lg border border-solid px-4 py-2.5 text-base transition-all duration-500 outline-none focus:border-solid focus:outline-0 dark:text-white`}
                      type="time"
                    />
                  </div>
                </div>
                <div className="mx-0 my-2.5 w-full">
                  <Link
                    href="#"
                    className={`${lato.className} btn btn-1 hover-filled-slide-down mt-4 overflow-hidden rounded-lg`}
                    type="submit"
                  >
                    <span>Make an appointment</span>
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-span-6">
              <Image
                src="/images/contact-page/contact.jpg"
                alt="Contact"
                width={1300}
                height={0}
                quality={100}
                style={{ width: "100%", height: "auto" }}
                className="rounded-lg bg-contain bg-no-repeat"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="dark:bg-darkmode py-10 md:py-24">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <div className="">
            <div className="border-opacity-50 dark:border-dark_border grid grid-cols-1 gap-0 border-b border-solid border-white pb-11 md:grid-cols-6 lg:grid-cols-9 xl:gap-30">
              <div className="col-span-3">
                <h2
                  className={`${lato.className} text-secondary max-w-219 text-[28px] leading-[2.25rem] font-bold sm:text-[40px] sm:leading-[3.4rem] dark:text-white`}
                >
                  Pune Head Office
                </h2>
              </div>
              <div className="col-span-3">
                <p
                  className={`${lato.className} text-secondary dark:text-darktext max-w-266 text-xl leading-10 font-normal sm:text-2xl`}
                >
                  4292 Mapleview Drive Greenfield Zip code 38230
                </p>
              </div>
              <div className="col-span-3">
                <Link
                  href="mailto:headoffice@symposium.com"
                  className={`${lato.className} text-secondary dark:text-SereneSky hover:text-RegalBlue text-xl font-medium underline sm:text-2xl hover:dark:text-white`}
                >
                  headoffice@symposium.com
                </Link>
                <Link
                  href="tel:731-621-5503"
                  className={`${lato.className} text-secondary dark:text-primary hover:text-opacity-100 flex w-fit items-center gap-2 text-xl sm:text-2xl hover:dark:text-white`}
                >
                  <span className={`${lato.className} text-primary`}>Call</span>
                  731-621-5503
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-30 pt-12 md:grid-cols-6 lg:grid-cols-9">
              <div className="col-span-3">
                <h2
                  className={`${lato.className} text-secondary max-w-219 text-[28px] leading-[2.25rem] font-bold sm:text-[40px] sm:leading-[3.4rem] dark:text-white`}
                >
                  Bengaluru Office
                </h2>
              </div>
              <div className="col-span-3">
                <p
                  className={`${lato.className} text-secondary dark:text-darktext max-w-266 text-xl leading-10 font-normal sm:text-2xl`}
                >
                  3502 Marcus Street Geraldine Zip code 35974
                </p>
              </div>
              <div className="col-span-3">
                <Link
                  href="mailto:Office@symposium.com"
                  className={`${lato.className} text-secondary dark:text-SereneSky hover:text-RegalBlue text-xl font-medium underline sm:text-2xl hover:dark:text-white`}
                >
                  Office@symposium.com
                </Link>
                <Link
                  href="tel:731-235-7993"
                  className={`${lato.className} text-secondary dark:text-primary flex w-fit items-center gap-2 text-xl sm:text-2xl hover:dark:text-white`}
                >
                  <span className={`${lato.className} text-primary`}>Call</span>
                  731-235-7993
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="dark:bg-darkmode py-10 md:py-24">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <div className="">
            <div className="border-opacity-50 dark:border-dark_border grid grid-cols-1 gap-0 border-b border-solid border-white pb-11 md:grid-cols-6 lg:grid-cols-9 xl:gap-30">
              <div className="col-span-3">
                <h2
                  className={`${lato.className} text-secondary max-w-219 text-[28px] leading-[2.25rem] font-bold sm:text-[40px] sm:leading-[3.4rem] dark:text-white`}
                >
                  Pune Head Office
                </h2>
              </div>
              <div className="col-span-3">
                <p
                  className={`${lato.className} text-secondary dark:text-darktext max-w-266 text-xl leading-10 font-normal sm:text-2xl`}
                >
                  4292 Mapleview Drive Greenfield Zip code 38230
                </p>
              </div>
              <div className="col-span-3">
                <Link
                  href="mailto:headoffice@symposium.com"
                  className={`${lato.className} text-secondary dark:text-SereneSky hover:text-RegalBlue text-xl font-medium underline sm:text-2xl hover:dark:text-white`}
                >
                  headoffice@symposium.com
                </Link>
                <Link
                  href="tel:731-621-5503"
                  className={`${lato.className} text-secondary dark:text-primary hover:text-opacity-100 flex w-fit items-center gap-2 text-xl sm:text-2xl hover:dark:text-white`}
                >
                  <span className={`${lato.className} text-primary`}>Call</span>
                  731-621-5503
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-30 pt-12 md:grid-cols-6 lg:grid-cols-9">
              <div className="col-span-3">
                <h2
                  className={`${lato.className} text-secondary max-w-219 text-[28px] leading-[2.25rem] font-bold sm:text-[40px] sm:leading-[3.4rem] dark:text-white`}
                >
                  Bengaluru Office
                </h2>
              </div>
              <div className="col-span-3">
                <p
                  className={`${lato.className} text-secondary dark:text-darktext max-w-266 text-xl leading-10 font-normal sm:text-2xl`}
                >
                  3502 Marcus Street Geraldine Zip code 35974
                </p>
              </div>
              <div className="col-span-3">
                <Link
                  href="mailto:Office@symposium.com"
                  className={`${lato.className} text-secondary dark:text-SereneSky hover:text-RegalBlue text-xl font-medium underline sm:text-2xl hover:dark:text-white`}
                >
                  Office@symposium.com
                </Link>
                <Link
                  href="tel:731-235-7993"
                  className={`${lato.className} text-secondary dark:text-primary flex w-fit items-center gap-2 text-xl sm:text-2xl hover:dark:text-white`}
                >
                  <span className={`${lato.className} text-primary`}>Call</span>
                  731-235-7993
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Contact;
