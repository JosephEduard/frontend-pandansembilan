import { useMemo, useState } from "react";

type Project = {
  title: string;
  location: string;
  category: string;
  year: string;
  status: string;
  scope: string[];
  gallery: string[];
};

const placeholderImg = "/images/general/construction.jpg";

const projects: Project[] = [
  {
    title: "Renovasi Interior Bank BCA Palembang",
    location: "Palembang",
    category: "Interior",
    year: "2024",
    status: "Selesai",
    scope: ["Desain interior", "MEP", "Fit-out"],
    gallery: [
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
    ],
  },
  {
    title: "Pekerjaan Fondasi Batu Kali dan Pagar",
    location: "Palembang",
    category: "Infrastruktur",
    year: "2024",
    status: "Selesai",
    scope: ["Sipil", "Drainase", "Pagar"],
    gallery: [
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
    ],
  },
  {
    title: "Pekerjaan Interior Kamar Tidur, Kamar Mandi, dan Kitchen Set",
    location: "Palembang",
    category: "Interior",
    year: "2023",
    status: "Selesai",
    scope: ["Interior", "Custom furniture", "MEP"],
    gallery: [
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
    ],
  },
  {
    title: "Perawatan ACP dan Pemasangan Booth Kantor",
    location: "Palembang",
    category: "Fasad & ACP",
    year: "2024",
    status: "Berjalan",
    scope: ["Fasad", "Booth kantor", "Perawatan"],
    gallery: [
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
    ],
  },
  {
    title: "Renovasi Bank Indonesia Palembang",
    location: "Palembang",
    category: "Renovasi",
    year: "2023",
    status: "Selesai",
    scope: ["Renovasi", "Interior", "Penguatan struktur"],
    gallery: [
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
    ],
  },
  {
    title: "Perbaikan dan Pengecoran Jalan PT Harakindo Palembang",
    location: "Palembang",
    category: "Infrastruktur",
    year: "2024",
    status: "Selesai",
    scope: ["Pengecoran", "Perkerasan", "Drainase"],
    gallery: [
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
      placeholderImg,
    ],
  },
];

const categories = [
  "Semua",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

const Portofolio = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Semua") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);
  const [lightbox, setLightbox] = useState<{
    project: Project;
    index: number;
  } | null>(null);

  const openLightbox = (project: Project, index: number) => {
    setLightbox({ project, index });
  };

  const closeLightbox = () => setLightbox(null);

  const stepLightbox = (delta: number) => {
    if (!lightbox) return;
    const { project, index } = lightbox;
    const total = project.gallery.length;
    const nextIndex = (index + delta + total) % total;
    setLightbox({ project, index: nextIndex });
  };

  return (
    <div className="w-full px-0 pb-16 text-slate-900">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 pt-16">
        <div className="absolute inset-0 -z-10 opacity-50 blur-3xl [background:radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.2),transparent_36%),radial-gradient(circle_at_80%_28%,rgba(34,211,238,0.2),transparent_32%),radial-gradient(circle_at_48%_78%,rgba(59,130,246,0.18),transparent_30%)]" />

        <section className="relative overflow-visible px-2 py-6 md:px-4 md:py-10">
          <div className="relative flex h-[360px] items-center md:h-[520px]">
            <div className="absolute top-0 left-0 z-10 max-w-xl space-y-4 md:space-y-5">
              <h1 className="text-8xl leading-[0.9] font-semibold text-slate-900 max-sm:mt-[-30px] max-sm:text-6xl sm:mt-[-50px] md:mt-[-70px] md:mr-20 md:text-9xl lg:mt-[-77px]">
                Portofolio
              </h1>
              <div className="mr-80 max-sm:mr-140 sm:mr-110 md:mr-110 lg:mr-90 xl:mr-80">
                <p className="md:text-md text-center text-base text-slate-700 lg:text-lg">
                  Discover a diverse range of properties, from residential to
                  commercial, tailored to suit your preferences.
                </p>
              </div>
              <div className="h-14 border-l-2 border-slate-300 max-sm:hidden sm:ml-17 md:ml-16 lg:ml-26 xl:ml-33" />
            </div>

            <div className="absolute top-0 right-0 h-[500px] w-3/4 overflow-hidden rounded-[30px] border border-slate-200 bg-slate-100">
              <div className="absolute inset-3 rounded-[24px]" />
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/general/construction.jpg')",
                }}
                aria-label="Hero proyek"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: "+40", desc: "Proyek selesai" },
            { label: "12", desc: "Kota dilayani" },
            { label: "98%", desc: "On-time delivery" },
          ].map((stat) => (
            <div
              key={stat.desc}
              className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-white/85 px-6 py-5 shadow-md"
            >
              <div className="pointer-events-none absolute inset-0 opacity-50 blur-3xl [background:radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.16),transparent_36%)]" />
              <div className="relative">
                <p className="text-3xl font-semibold text-slate-900">
                  {stat.label}
                </p>
                <p className="text-sm text-slate-700">{stat.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl border border-cyan-100 bg-white/85 px-6 py-8 shadow-xl">
          <div className="pointer-events-none absolute inset-0 opacity-60 blur-3xl [background:radial-gradient(circle_at_10%_12%,rgba(14,165,233,0.16),transparent_36%),radial-gradient(circle_at_88%_18%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.14),transparent_30%)]" />
          <div className="relative mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.16em] text-cyan-700 uppercase">
                Katalog proyek
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                Proyek unggulan CV Pandan Sembilan
              </h2>
              <p className="text-sm text-slate-700 md:text-base">
                Tampilan abstrak namun rapi, menonjolkan pekerjaan aktual yang
                telah kami selesaikan.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    activeCategory === cat
                      ? "border-cyan-500 bg-cyan-500 text-white shadow"
                      : "border-cyan-200 bg-white text-cyan-800 hover:border-cyan-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative grid gap-5 md:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.title}
                className={`group relative overflow-hidden rounded-3xl border border-cyan-100 bg-white/90 p-5 shadow-md transition hover:-translate-y-1 hover:border-cyan-400/80 ${
                  idx % 3 === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-45 blur-2xl [background:radial-gradient(circle_at_25%_15%,rgba(14,165,233,0.14),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.12),transparent_36%)]" />
                <div className="relative flex flex-col gap-4">
                  <div className="grid h-48 grid-cols-3 grid-rows-2 gap-2 rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-2 shadow-inner">
                    {project.gallery.slice(0, 6).map((img, imageIdx) => (
                      <button
                        key={`${project.title}-${imageIdx}`}
                        type="button"
                        onClick={() => openLightbox(project, imageIdx)}
                        className="relative overflow-hidden rounded-xl border border-white/60 bg-slate-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        style={{
                          backgroundImage: `url(${img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        aria-label={`Perbesar foto ${project.title}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-100/20" />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs tracking-[0.14em] text-cyan-700 uppercase">
                        {project.category}
                      </p>
                      <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-700">
                        {project.location} · {project.year} · {project.status}
                      </p>
                    </div>
                    <span className="rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-semibold text-cyan-800 shadow-sm">
                      {project.scope[0]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-cyan-900">
                    {project.scope.map((tag) => (
                      <span
                        key={`${project.title}-${tag}`}
                        className="rounded-full border border-cyan-200 bg-white px-3 py-1 font-semibold shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-cyan-800">
                    <span className="inline-flex items-center gap-2 font-semibold">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                      Aktif & siap untuk proyek berikutnya
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-400 px-3 py-1 font-semibold text-cyan-800 transition hover:bg-cyan-50"
                    >
                      Diskusikan proyek serupa
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-cyan-100 bg-white/95 shadow-2xl">
            <div className="pointer-events-none absolute inset-0 opacity-60 blur-3xl [background:radial-gradient(circle_at_12%_20%,rgba(14,165,233,0.16),transparent_35%),radial-gradient(circle_at_88%_25%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.14),transparent_32%)]" />
            <div className="relative flex flex-col gap-4 p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.14em] text-cyan-700 uppercase">
                    {lightbox.project.category}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    {lightbox.project.title}
                  </h3>
                  <p className="text-sm text-slate-700">
                    {lightbox.project.location} · {lightbox.project.year} ·{" "}
                    {lightbox.project.status}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-800"
                  aria-label="Tutup"
                >
                  ✕
                </button>
              </div>

              <div className="relative h-[420px] overflow-hidden rounded-2xl border border-cyan-100 bg-slate-100">
                <img
                  src={lightbox.project.gallery[lightbox.index]}
                  alt={lightbox.project.title}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-white/10" />

                <div className="absolute inset-y-0 left-0 flex items-center p-4">
                  <button
                    type="button"
                    onClick={() => stepLightbox(-1)}
                    className="rounded-full border border-white/50 bg-white/80 px-3 py-2 text-lg font-semibold text-slate-800 shadow transition hover:-translate-y-0.5 hover:bg-white"
                    aria-label="Sebelumnya"
                  >
                    ‹
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center p-4">
                  <button
                    type="button"
                    onClick={() => stepLightbox(1)}
                    className="rounded-full border border-white/50 bg-white/80 px-3 py-2 text-lg font-semibold text-slate-800 shadow transition hover:-translate-y-0.5 hover:bg-white"
                    aria-label="Berikutnya"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-700">
                <div className="flex flex-wrap gap-2">
                  {lightbox.project.scope.map((tag) => (
                    <span
                      key={`${lightbox.project.title}-${tag}`}
                      className="rounded-full border border-cyan-200 bg-white px-3 py-1 font-semibold text-cyan-800 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-cyan-800">
                  {lightbox.index + 1} / {lightbox.project.gallery.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portofolio;
