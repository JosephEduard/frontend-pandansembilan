import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Lato } from "next/font/google";

import Carousel from "@/components/Carousel/Carousel";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const services = [
  {
    title: "PEKERJAAN WATERPROOFING",
    img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "PEMBANGUNAN RUMAH",
    img: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "PEKERJAAN RENOVASI",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=60",
  },
];

const portfolio = [
  {
    category: "Project 1",
    title: "Residential Renovation",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=60",
    description:
      "Renovasi rumah tinggal dengan peningkatan struktur, tata ruang modern, dan efisiensi material tanpa mengorbankan estetika.",
  },
  {
    category: "Project 2",
    title: "Villa Construction",
    img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=60",
    description:
      "Pembangunan vila premium dengan konstruksi kokoh, pencahayaan alami optimal, dan finishing berkualitas tinggi.",
  },
  {
    category: "Project 3",
    title: "Commercial Building",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=60",
    description:
      "Proyek gedung komersial fokus pada keamanan struktural, aksesibilitas, serta fleksibilitas ruang untuk berbagai kebutuhan bisnis.",
  },
];

// Swagger fetch template untuk Hero/Home (kombinasikan GET /service & GET /project)
// const fetchHomeData = async () => {
//   try {
//     const [servicesRes, projectsRes] = await Promise.all([
//       fetch("https://backend-cvps.vercel.app/api/service", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN ?? ""}`,
//         },
//       }),
//       fetch("https://backend-cvps.vercel.app/api/project", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN ?? ""}`,
//         },
//       }),
//     ]);
//     if (!servicesRes.ok || !projectsRes.ok) {
//       throw new Error("Failed to fetch landing data");
//     }
//     const servicesPayload = await servicesRes.json();
//     const projectsPayload = await projectsRes.json();
//     // setServiceHighlights(servicesPayload.data);
//     // setFeaturedProjects(projectsPayload.data);
//   } catch (error) {
//     console.error("[HomeView] fetchHomeData", error);
//   }
// };

const Home = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null); // Reference for portfolio section
  const ctaRef = useRef(null); // Reference for CTA section
  // Use `whileInView` with `viewport` for repeatable, smooth entrance animations.

  // Track scroll direction globally
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;

      setScrollDir(lastY > y ? "up" : "down");
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Directional reveal hook
  const useDirectionalReveal = (ref: React.RefObject<HTMLElement>) => {
    const [entered, setEntered] = useState(false);

    useEffect(() => {
      const el = ref.current;

      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Always reveal when entering viewport from any direction
            setEntered(true);
          } else {
            // Only hide if scrolling up and element has passed above the viewport
            const rect = entry.boundingClientRect;
            const fullyAbove = rect.bottom < 0;
            const fullyBelow = rect.top > window.innerHeight;

            if (scrollDir === "up" && fullyAbove) {
              setEntered(false);
            } else if (scrollDir === "down" && fullyBelow) {
              // Reset when scrolling down and section has moved entirely below viewport
              setEntered(false);
            }
          }
        },
        { threshold: 0.25 },
      );

      obs.observe(el);

      return () => obs.disconnect();
    }, [scrollDir, ref]);

    return entered;
  };

  const aboutEntered = useDirectionalReveal(aboutRef);
  const servicesEntered = useDirectionalReveal(servicesRef);
  const portfolioEntered = useDirectionalReveal(portfolioRef);
  const ctaEntered = useDirectionalReveal(ctaRef);

  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects =
    activeFilter === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === activeFilter);

  // Upward fade mapping config
  const UP_FADE_START = 400; // px after center passes viewport center (guard)
  const UP_FADE_DISTANCE = 550; // px range to fade 1 -> 0 when scrolling up

  // Compute upward fade alpha per section (1 while scrolling down)
  const useUpwardAlpha = (ref: React.RefObject<HTMLElement>) => {
    const [alpha, setAlpha] = useState(1);

    useEffect(() => {
      const el = ref.current;

      if (!el) return;
      let ticking = false;
      const update = () => {
        ticking = false;
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;

        // Only fade sections that are BELOW the viewport center while scrolling up
        if (scrollDir === "up" && sectionCenter > viewportCenter) {
          const delta = sectionCenter - viewportCenter - UP_FADE_START;
          const t = Math.max(0, Math.min(1, delta / UP_FADE_DISTANCE));

          setAlpha(1 - t);
        } else {
          if (alpha !== 1) setAlpha(1);
        }
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, [ref, scrollDir]);

    return alpha;
  };

  const aboutAlpha = useUpwardAlpha(aboutRef);
  const servicesAlpha = useUpwardAlpha(servicesRef);
  const portfolioAlpha = useUpwardAlpha(portfolioRef);
  const ctaAlpha = useUpwardAlpha(ctaRef);

  // Animation mapping per section
  const sectionAnimate = (entered: boolean, alpha: number) => ({
    opacity: entered ? (scrollDir === "down" ? 1 : alpha) : 0,
    y: entered ? 0 : 40,
    scale: 1,
  });

  return (
    <main className="flex flex-col gap-32 pt-0 pb-8 md:gap-40 md:pb-10 lg:gap-48">
      {/* Carousel / Hero (full-bleed under navbar) */}
      <div className="relative h-full w-full" id="hero-carousel">
        <Carousel />
      </div>

      {/* About Us */}
      <motion.section
        ref={aboutRef}
        animate={sectionAnimate(aboutEntered, aboutAlpha)}
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-xl"
            initial={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-blue-100 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-gradient-to-tr from-red-100 to-transparent opacity-50" />

            <div className="relative grid grid-cols-1 items-stretch gap-12 p-8 md:grid-cols-2 md:p-12">
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className={`${lato.className} mb-2 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600`}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  CV Pandan Sembilan
                </motion.div>

                <motion.h3
                  animate={{ opacity: 1, y: 0 }}
                  className={`${lato.className} mb-0 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text pb-6 text-2xl font-bold text-transparent sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl`}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Tentang Kami
                </motion.h3>

                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className={`${lato.className} text-justify text-base leading-relaxed text-gray-700 sm:text-lg md:text-left md:text-xl lg:text-2xl`}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  CV Pandan Sembilan merupakan Perusahaan konstruksi Swasta
                  berskala Nasional yang berdiri pada Desember 2021 oleh Founder
                  CV Pandan Sembilan, Heru Noviyanto. CV Pandan Sembilan
                  menyediakan jasa perencanaan pembangunan, renovasi dan
                  pemeliharaan gedung, perumahan, vila, kost, sekolah, mekanikal
                  elektrikal plumbing, ACP (Aluminium Composite Panel), jalan
                  raya, dan lain-lain.
                </motion.p>

                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className={`${lato.className} mt-4 text-justify text-base leading-relaxed text-gray-700 sm:text-lg md:text-left md:text-xl lg:text-2xl`}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Pada dasarnya CV Pandan Sembilan dibangun untuk memenuhi
                  kebutuhan konsumen serta meningkatkan struktur pembangunan
                  yang kian meningkat, serta menjaga keselamatan masyarakat di
                  lokasi pembangunan proyek dan sekitarnya.
                </motion.p>

                {/* Stats */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className={`${lato.className} mt-8 grid grid-cols-3 gap-4`}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {[
                    { number: "100+", label: "Projek" },
                    { number: "50+", label: "Klien" },
                    { number: "3+", label: "Tahun" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="rounded-lg bg-gradient-to-br from-blue-50 to-gray-50 p-4 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div
                        className={`${lato.className} text-2xl font-bold text-blue-600 md:text-3xl`}
                      >
                        {stat.number}
                      </div>
                      <div
                        className={`${lato.className} text-sm text-gray-600`}
                      >
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="flex items-stretch justify-end"
                initial={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  className="group relative h-full w-full max-w-full overflow-hidden rounded-2xl shadow-2xl sm:max-w-[420px] md:max-w-[640px] lg:max-w-[820px] xl:max-w-[980px] 2xl:max-w-[1100px]"
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1400&q=60')`,
                      minHeight: "400px",
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Best Services */}
      <motion.section
        ref={servicesRef}
        animate={sectionAnimate(servicesEntered, servicesAlpha)}
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className={`${lato.className} mb-4 inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-600`}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Tawaran Kami
            </motion.div>
            <h3
              className={`${lato.className} bg-gradient-to-r from-gray-900 via-red-700 to-gray-900 bg-clip-text text-5xl font-bold text-transparent`}
            >
              Layanan Terbaik Kami
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {services.map((s, index) => (
              <motion.div
                key={s.title}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    className="h-48 bg-cover bg-center sm:h-60 md:h-72 lg:h-80 xl:h-96 2xl:h-[28rem]"
                    style={{ backgroundImage: `url('${s.img}')` }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  {/* Hover overlay */}
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-red-600/90 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <motion.div
                  className="absolute right-0 bottom-0 left-0"
                  transition={{ duration: 0.3 }}
                  whileHover={{ height: "100%" }}
                >
                  <div
                    className={`${lato.className} flex h-full flex-col justify-end rounded-b-2xl bg-red-600 py-3 text-center text-sm font-semibold text-white sm:py-4 sm:text-base md:text-lg`}
                  >
                    <motion.span
                      initial={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ opacity: 0 }}
                    >
                      {s.title}
                    </motion.span>
                  </div>
                </motion.div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-red-500 opacity-0"
                  transition={{ duration: 0.3 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Portfolio */}
      <motion.section
        ref={portfolioRef}
        animate={sectionAnimate(portfolioEntered, portfolioAlpha)}
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className={`${lato.className} mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600`}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Pekerjaan Kami
            </motion.div>
            <h3
              className={`${lato.className} bg-gradient-to-r from-gray-900 via-blue-700 to-gray-900 bg-clip-text text-5xl font-bold text-transparent`}
            >
              Portofolio Kami
            </h3>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={`${lato.className} mb-8 flex flex-wrap items-center justify-center gap-3`}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {["All", "Project 1", "Project 2", "Project 3"].map((filter, i) => (
              <motion.div
                key={filter}
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40"
                      : "border border-blue-200 bg-white text-blue-600 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                  radius="full"
                  size="sm"
                  variant={activeFilter === filter ? "solid" : "flat"}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {activeFilter === "All" ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {filteredProjects.map((p, i) => (
                <motion.div
                  key={p.category}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="h-40 bg-cover bg-center sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-[22rem]"
                      style={{ backgroundImage: `url('${p.img}')` }}
                      transition={{ duration: 0.6 }}
                      whileHover={{ scale: 1.15 }}
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-blue-600/80"
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600"
                        initial={{ scale: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1, rotate: 90 }}
                      >
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-blue-500 opacity-0"
                    transition={{ duration: 0.3 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto w-full max-w-[1100px]"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              {filteredProjects.map((p) => (
                <div
                  key={p.category}
                  className="overflow-hidden rounded-3xl bg-white shadow-2xl"
                >
                  <div
                    className="h-[420px] bg-cover bg-center sm:h-[500px] md:h-[560px] lg:h-[600px]"
                    style={{ backgroundImage: `url('${p.img}')` }}
                  />
                  <div className="space-y-4 px-6 py-8 sm:px-8 md:px-10">
                    <h4
                      className={`${lato.className} text-2xl font-bold text-blue-700 sm:text-3xl md:text-4xl`}
                    >
                      {p.title}
                    </h4>
                    <p
                      className={`${lato.className} text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl`}
                    >
                      {p.description}
                    </p>
                    <Button
                      className={`${lato.className} bg-blue-600 text-white shadow-lg hover:bg-blue-500`}
                      radius="full"
                      size="md"
                    >
                      Hubungi Kami Untuk Projek Ini
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA / Info box */}
      <motion.section
        ref={ctaRef}
        animate={sectionAnimate(ctaEntered, ctaAlpha)}
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto mb-8 max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 p-6 text-white shadow-2xl max-sm:min-h-[460px] sm:min-h-[420px] sm:p-8 md:min-h-[440px] md:p-10 lg:min-h-[420px] lg:p-12 xl:min-h-[400px] xl:p-14 2xl:min-h-[380px] 2xl:p-16"
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white blur-3xl" />
            </div>

            {/* Floating dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                className="absolute h-2 w-2 rounded-full bg-white/30"
                style={{
                  top: `${20 + i * 15}%`,
                  right: `${10 + i * 10}%`,
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}

            <div className="relative flex flex-col items-center justify-center gap-10 text-center">
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className={`${lato.className} flex flex-1 items-center text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl`}
                initial={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div>
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className={`${lato.className} mb-4 text-sm font-medium tracking-wider text-blue-100 uppercase`}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Siap Membangun?
                  </motion.div>
                  CV Pandan Sembilan menyediakan jasa perencanaan pembangunan,
                  renovasi dan pemeliharaan gedung, perumahan, vila, kost,
                  sekolah, mekanikal elektrikal plumbing, ACP (Aluminium
                  Composite Panel), jalan raya, dan lain-lain.
                </div>
              </motion.div>

              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="flex-shrink-0 self-center"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    as={Link}
                    className={`${lato.className} group relative overflow-hidden rounded-full bg-white px-8 py-6 font-bold text-blue-600 shadow-xl transition-all hover:shadow-2xl sm:px-10 sm:py-7 md:px-10 md:py-7 lg:px-12 lg:py-8 xl:px-14 xl:py-9`}
                    href="/contact"
                  >
                    <motion.span
                      className={`${lato.className} relative z-10 flex items-center gap-2`}
                      transition={{ duration: 0.3 }}
                      whileHover={{ x: 5 }}
                    >
                      Hubungi Kami
                      <motion.svg
                        animate={{ x: [0, 5, 0] }}
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        transition={{ duration: 1.5, repeat: Infinity }}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </motion.svg>
                    </motion.span>

                    {/* Hover effect background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white"
                      initial={{ x: "-100%" }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ x: 0 }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Corner accents */}
            <motion.div
              animate={{ scale: 1 }}
              className="absolute top-4 left-4 h-12 w-12 border-t-2 border-l-2 border-white/30"
              initial={{ scale: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.div
              animate={{ scale: 1 }}
              className="absolute right-4 bottom-4 h-12 w-12 border-r-2 border-b-2 border-white/30"
              initial={{ scale: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default Home;
