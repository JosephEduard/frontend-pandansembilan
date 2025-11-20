import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Head from "next/head";

// Custom animated construction-themed landing page
export default function AlternativeLanding() {
  const [soundOn, setSoundOn] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Loading screen progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Don't render main content until loading is done
  if (loading) {
    return <LoadingScreen progress={loadProgress} />;
  }

  return (
    <>
      <Head>
        <title>CV Pandan Sembilan - Building Tomorrow</title>
        <meta
          name="description"
          content="Award-winning construction company delivering excellence"
        />
      </Head>

      <ParticleBackground />

      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-6 w-6 rounded-full border-2 border-orange-500 mix-blend-difference"
        animate={{
          x: cursorPos.x - 12,
          y: cursorPos.y - 12,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 right-0 left-0 z-50 bg-black/90 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-8 py-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-white"
          >
            CV PANDAN <span className="text-orange-500">SEMBILAN</span>
          </motion.div>

          <div className="hidden gap-12 md:flex">
            {["Projects", "Services", "Process", "Team", "Contact"].map(
              (item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  whileHover={{ y: -2 }}
                  className="text-sm font-medium tracking-wider text-white/70 uppercase transition-colors hover:text-orange-500"
                >
                  {item}
                </motion.a>
              ),
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSoundOn(!soundOn)}
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs tracking-wider text-white uppercase"
          >
            Sound {soundOn ? "On" : "Off"}
          </motion.button>
        </div>
      </motion.nav>

      <div className="bg-black">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          style={{ opacity, scale }}
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0">
            <svg className="h-full w-full opacity-20">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <motion.path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(251, 146, 60, 0.3)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Floating Blueprint Lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              style={{
                width: `${300 + i * 100}px`,
                top: `${20 + i * 15}%`,
                left: `-${i * 50}px`,
              }}
              animate={{
                x: ["0%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}

          <div className="relative z-10 px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-4 text-sm tracking-[0.3em] text-orange-500 uppercase"
            >
              Building Tomorrow
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mb-6 text-6xl leading-tight font-bold text-white md:text-8xl lg:text-9xl"
            >
              ENGINEERING
              <br />
              <span className="text-orange-500">EXCELLENCE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-white/60 md:text-xl"
            >
              Struktur kokoh, desain modern, hasil memuaskan. Kami membangun
              masa depan dengan presisi dan inovasi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-orange-500 px-12 py-5 text-sm font-bold tracking-wider text-black uppercase"
              >
                <span className="relative z-10">Discover Projects</span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500 text-orange-500 transition-colors hover:bg-orange-500 hover:text-black"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14m-7-7l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white/40"
              >
                <path
                  d="M12 5v14m0 0l7-7m-7 7l-7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Animated Construction Equipment */}
          <AnimatedCrane />
        </motion.section>

        {/* Stats Section */}
        <StatsSection />

        {/* Process Steps */}
        <ProcessSection />

        {/* Projects Gallery */}
        <ProjectsSection />

        {/* Services Grid */}
        <ServicesSection />

        {/* Team Section */}
        <TeamSection />

        {/* Contact CTA */}
        <ContactSection />
      </div>
    </>
  );
}

// Stats with animated counters
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: 150, label: "Projects Completed", suffix: "+" },
    { number: 98, label: "Client Satisfaction", suffix: "%" },
    { number: 25, label: "Expert Team", suffix: "+" },
    { number: 10, label: "Years Experience", suffix: "+" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      {/* Background Construction Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="construction"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="#fb923c"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="#fb923c"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#construction)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl font-bold text-white md:text-7xl">
            Built on <span className="text-orange-500">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative">
                <CountUp
                  end={stat.number}
                  duration={2}
                  start={isInView}
                  suffix={stat.suffix}
                />
                <p className="mt-2 text-sm tracking-wider text-white/60 uppercase">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Counter animation
function CountUp({
  end,
  duration,
  start,
  suffix = "",
}: {
  end: number;
  duration: number;
  start: boolean;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [start, end, duration]);

  return (
    <div className="text-5xl font-bold text-white md:text-6xl">
      {count}
      {suffix}
    </div>
  );
}

// Process section with step-by-step animation
function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      title: "Plan & Design",
      description:
        "Konsultasi mendalam untuk memahami visi Anda. Kami merancang blueprint yang detail dan komprehensif.",
      icon: "📐",
    },
    {
      number: "02",
      title: "Build & Construct",
      description:
        "Tim ahli kami mengeksekusi dengan presisi. Material berkualitas dan teknik modern untuk hasil terbaik.",
      icon: "🏗️",
    },
    {
      number: "03",
      title: "Quality Check",
      description:
        "Inspeksi menyeluruh di setiap tahap. Standar keamanan tertinggi dan quality control ketat.",
      icon: "✓",
    },
    {
      number: "04",
      title: "Deliver Excellence",
      description:
        "Penyerahan tepat waktu dengan garansi lengkap. Dukungan purna jual untuk kepuasan Anda.",
      icon: "🎯",
    },
  ];

  return (
    <section id="process" ref={ref} className="relative py-32">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="mb-4 text-sm tracking-[0.3em] text-orange-500 uppercase">
            Our Process
          </div>
          <h2 className="text-5xl font-bold text-white md:text-7xl">
            How We <span className="text-orange-500">Build</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <motion.div
            className="absolute top-0 left-8 hidden h-full w-px bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent md:block"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group relative flex gap-8"
              >
                {/* Number Circle */}
                <motion.div
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-500 bg-black text-2xl font-bold text-orange-500"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {step.number}
                </motion.div>

                {/* Content */}
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all group-hover:border-orange-500/50">
                  <div className="mb-4 text-4xl">{step.icon}</div>
                  <h3 className="mb-4 text-3xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Projects with parallax effect
function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Modern Villa Complex",
      category: "Residential",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      year: "2024",
    },
    {
      title: "Corporate Office Tower",
      category: "Commercial",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      year: "2024",
    },
    {
      title: "Luxury Resort",
      category: "Hospitality",
      image:
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
      year: "2023",
    },
    {
      title: "Shopping Mall",
      category: "Retail",
      image:
        "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800&q=80",
      year: "2023",
    },
  ];

  return (
    <section id="projects" ref={ref} className="relative py-32">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="mb-4 text-sm tracking-[0.3em] text-orange-500 uppercase">
            Portfolio
          </div>
          <h2 className="text-5xl font-bold text-white md:text-7xl">
            Featured <span className="text-orange-500">Projects</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              {/* Blueprint Reveal Effect */}
              <motion.div
                className="absolute inset-0 z-10 bg-blue-900/90"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: "left" }}
              >
                <svg className="h-full w-full opacity-30">
                  <defs>
                    <pattern
                      id={`blueprint-${i}`}
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <line
                        x1="0"
                        y1="10"
                        x2="20"
                        y2="10"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="10"
                        y1="0"
                        x2="10"
                        y2="20"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#blueprint-${i})`}
                  />
                </svg>
              </motion.div>

              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 0.9 }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="mb-2 text-sm tracking-wider text-orange-500 uppercase"
                >
                  {project.category} · {project.year}
                </motion.div>
                <h3 className="text-3xl font-bold text-white">
                  {project.title}
                </h3>
              </div>

              {/* Hover Border Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-orange-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Corner Measurements Animation */}
              <motion.div
                className="absolute top-4 left-4 font-mono text-xs text-orange-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.year}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 3D Building Showcase */}
        <Building3D />
      </div>
    </section>
  );
}

// 3D Building Rotation Component
function Building3D() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * 20);
    setRotateY((x - 0.5) * 20);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-20"
    >
      <div className="mb-12 text-center">
        <h3 className="text-4xl font-bold text-white">
          Experience Our <span className="text-orange-500">3D Vision</span>
        </h3>
        <p className="mt-4 text-white/60">Hover to explore the structure</p>
      </div>

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setRotateX(0);
          setRotateY(0);
        }}
        className="perspective-1000 mx-auto flex h-[500px] w-full max-w-2xl items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{
            rotateX,
            rotateY,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative h-64 w-64"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Building Layers */}
          {[0, 1, 2, 3, 4].map((layer) => (
            <motion.div
              key={layer}
              className="absolute inset-0 rounded-lg border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent"
              style={{
                transform: `translateZ(${layer * 30}px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: layer * 0.1 }}
            >
              {/* Windows Grid */}
              <div className="grid h-full w-full grid-cols-4 gap-2 p-4">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-orange-500/20"
                    animate={{
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1 + layer * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Rotating Construction Crane */}
          <motion.div
            className="absolute -top-20 left-1/2 h-40 w-1"
            style={{
              transform: "translateX(-50%) translateZ(150px)",
              transformStyle: "preserve-3d",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-full w-full bg-gradient-to-t from-orange-500 to-orange-600" />
            <div className="absolute top-0 left-0 h-1 w-20 bg-orange-500" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Services with icon animations
function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Residential Construction",
      description: "Rumah impian dengan desain modern dan fungsional",
      icon: "🏠",
    },
    {
      title: "Commercial Buildings",
      description: "Gedung perkantoran dan retail yang inovatif",
      icon: "🏢",
    },
    {
      title: "Renovations",
      description: "Transformasi ruang dengan sentuhan profesional",
      icon: "🔨",
    },
    {
      title: "MEP Services",
      description: "Mechanical, Electrical & Plumbing terpadu",
      icon: "⚡",
    },
    {
      title: "Interior Design",
      description: "Desain interior yang estetik dan ergonomis",
      icon: "🎨",
    },
    {
      title: "Project Management",
      description: "Manajemen proyek end-to-end yang efisien",
      icon: "📊",
    },
  ];

  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="mb-4 text-sm tracking-[0.3em] text-orange-500 uppercase">
            What We Do
          </div>
          <h2 className="text-5xl font-bold text-white md:text-7xl">
            Our <span className="text-orange-500">Services</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative">
                <motion.div
                  className="mb-6 text-6xl"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="mb-3 text-2xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-white/60">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Team section
function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Heru Noviyanto",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      name: "Siti Rahma",
      role: "Chief Architect",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      name: "Budi Santoso",
      role: "Project Director",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
    {
      name: "Diana Putri",
      role: "Head of Design",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    },
  ];

  return (
    <section id="team" ref={ref} className="relative py-32">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="mb-4 text-sm tracking-[0.3em] text-orange-500 uppercase">
            The Team
          </div>
          <h2 className="text-5xl font-bold text-white md:text-7xl">
            Meet The <span className="text-orange-500">Experts</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Tim profesional dengan pengalaman puluhan tahun di industri
            konstruksi
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 0.9 }}
              />

              <div className="absolute right-0 bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-sm text-orange-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact CTA
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="relative py-32">
      <div className="mx-auto max-w-5xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-16 text-center"
        >
          {/* Animated Corner Lines */}
          {[
            "top-0 left-0",
            "top-0 right-0",
            "bottom-0 left-0",
            "bottom-0 right-0",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} h-20 w-20 border-orange-500`}
              style={{
                borderTopWidth: pos.includes("top") ? 2 : 0,
                borderLeftWidth: pos.includes("left") ? 2 : 0,
                borderRightWidth: pos.includes("right") ? 2 : 0,
                borderBottomWidth: pos.includes("bottom") ? 2 : 0,
              }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}

          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-5xl font-bold text-white md:text-6xl"
            >
              Ready to Build Your <span className="text-orange-500">Dream</span>
              ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-white/60"
            >
              Mari wujudkan proyek konstruksi Anda bersama CV Pandan Sembilan.
              Tim kami siap memberikan solusi terbaik.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full bg-orange-500 px-12 py-5 text-sm font-bold tracking-wider text-black uppercase"
            >
              <span className="relative z-10">Get In Touch</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <div className="mt-12 flex items-center justify-center gap-8">
              <div className="text-left">
                <p className="text-sm tracking-wider text-white/40 uppercase">
                  Phone
                </p>
                <p className="text-lg font-semibold text-white">
                  0898-1234-1231
                </p>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-left">
                <p className="text-sm tracking-wider text-white/40 uppercase">
                  Location
                </p>
                <p className="text-lg font-semibold text-white">
                  Palembang, Indonesia
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-32 border-t border-white/10 py-12 text-center text-sm text-white/40"
      >
        <p>
          © 2025 CV Pandan Sembilan. Building Tomorrow, Today. All rights
          reserved.
        </p>
      </motion.footer>
    </section>
  );
}

// Loading Screen with Construction Progress
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="relative w-full max-w-md px-8">
        {/* Animated Blueprint */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-6 h-24 w-24"
          >
            <svg viewBox="0 0 100 100" className="text-orange-500">
              <motion.path
                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="5"
                fill="currentColor"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-2 text-2xl font-bold text-white"
          >
            CV PANDAN <span className="text-orange-500">SEMBILAN</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-white/60"
          >
            Loading Excellence...
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.div
            className="mt-4 text-center font-mono text-sm text-orange-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {Math.floor(progress)}%
          </motion.div>
        </div>

        {/* Loading Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center text-xs text-white/40"
        >
          {progress < 30 && "Preparing blueprint..."}
          {progress >= 30 && progress < 60 && "Loading materials..."}
          {progress >= 60 && progress < 90 && "Building structure..."}
          {progress >= 90 && "Almost ready..."}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Particle Background Effect
function ParticleBackground() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-orange-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated Construction Crane
function AnimatedCrane() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="pointer-events-none absolute right-10 bottom-0 z-20"
    >
      {/* Crane Base */}
      <motion.div className="relative h-48 w-48">
        {/* Tower */}
        <motion.div
          className="absolute bottom-0 left-1/2 h-40 w-2 -translate-x-1/2 bg-gradient-to-t from-orange-600 to-orange-400"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "bottom" }}
        />

        {/* Rotating Arm */}
        <motion.div
          className="absolute bottom-40 left-1/2 -translate-x-1/2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Horizontal Arm */}
          <div className="relative h-2 w-32 bg-orange-500">
            {/* Hook */}
            <motion.div
              className="absolute top-2 left-24 h-12 w-0.5 bg-orange-400"
              animate={{ height: [48, 60, 48] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute -bottom-2 left-1/2 h-2 w-4 -translate-x-1/2 bg-orange-500"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Counter Weight */}
          <div className="absolute top-0 right-0 h-4 w-8 bg-orange-600" />
        </motion.div>

        {/* Light Blink */}
        <motion.div
          className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}
