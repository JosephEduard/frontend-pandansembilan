/* eslint-disable react/jsx-sort-props */
import { useEffect, useMemo, useState } from "react";
import { Lato } from "next/font/google";
import { Button } from "@heroui/button";
import { Spinner, Skeleton } from "@heroui/react";

import serviceProjects from "@/services/project.service";
import serviceProjectImage from "@/services/projectimage.service";

type Project = {
  title: string;
  location: string;
  category: string;
  year: string;
  status: string;
  scope: string[];
  gallery: string[];
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

// Data diisi dari database
const emptyProjects: Project[] = [];

const Portofolio = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [projects, setProjects] = useState<Project[]>(emptyProjects);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchPortfolioProjects = async () => {
      try {
        setIsProjectsLoading(true);
        const res = await serviceProjects.getProjects("page=1&limit=999");
        const payload = res.data;
        const raw = Array.isArray(payload?.data) ? payload.data : [];

        const baseMapped: Project[] = raw.map((item: any) => {
          // safely derive fields used by template
          const title = item?.title ?? item?.name ?? "Tanpa Judul";
          const address = item?.address ?? "";
          const serviceName = (() => {
            // Support various backend shapes: string, nested service object, nested serviceId object
            const direct = item?.serviceName;
            const svcObj = item?.service;
            const svcIdObj = item?.serviceId;

            if (typeof direct === "string" && direct) return direct;
            if (svcObj && typeof svcObj === "object") {
              return svcObj?.name ?? svcObj?.title ?? "Umum";
            }
            if (svcIdObj && typeof svcIdObj === "object") {
              return svcIdObj?.name ?? svcIdObj?.title ?? "Umum";
            }

            return "Umum";
          })();

          const yearVal = item?.year;
          let year = "";

          try {
            if (typeof yearVal === "number") {
              year = String(yearVal);
            } else if (typeof yearVal === "string") {
              const d = new Date(yearVal);

              year = isNaN(d.getTime())
                ? String(yearVal ?? "")
                : d.getFullYear().toString();
            } else if (yearVal instanceof Date) {
              year = isNaN(yearVal.getTime())
                ? String(yearVal ?? "")
                : yearVal.getFullYear().toString();
            } else {
              year = String(yearVal ?? "");
            }
          } catch {
            year = String(yearVal ?? "");
          }

          // Map status from backend boolean/string to display labels
          const rawStatus =
            item?.status ?? item?.isDone ?? item?.isCompleted ?? item?.finished;
          let status = "Sedang dalam pengerjaan";

          if (typeof rawStatus === "boolean") {
            status = rawStatus ? "Selesai" : "Sedang dalam pengerjaan";
          } else if (typeof rawStatus === "string") {
            const s = rawStatus.toLowerCase();

            status = [
              "selesai",
              "done",
              "completed",
              "true",
              "finish",
              "finished",
            ].some((k) => s.includes(k))
              ? "Selesai"
              : "Sedang dalam pengerjaan";
          }

          return {
            title,
            location: address || "",
            category: String(serviceName || "Umum"),
            year,
            status,
            scope: [String(serviceName || "Proyek")],
            gallery: [],
          } as Project;
        });

        // Fetch galleries per project
        const withGalleries = await Promise.all(
          baseMapped.map(async (p, idx) => {
            const projectId = raw[idx]?._id ?? raw[idx]?.id ?? null;

            if (!projectId) {
              return { ...p, gallery: [] };
            }
            try {
              const gRes =
                await serviceProjectImage.getProjectImagesProjectByProjectId(
                  String(projectId) as any,
                );
              const gPayload = gRes.data;
              const urls: string[] = Array.isArray(gPayload?.data)
                ? gPayload.data
                    .map((img: any) => img?.url ?? img?.image ?? "")
                    .filter((u: string) => !!u)
                : [];

              return {
                ...p,
                gallery: urls,
              };
            } catch {
              return { ...p, gallery: [] };
            }
          }),
        );

        setProjects(withGalleries);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("[Portofolio] fetchPortfolioProjects", error);
      } finally {
        setIsProjectsLoading(false);
      }
    };

    fetchPortfolioProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Semua") return projects;

    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));

    return ["Semua", ...Array.from(set)];
  }, [projects]);
  const [lightbox, setLightbox] = useState<{
    project: Project;
    index: number;
  } | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openLightbox = (project: Project, index: number) => {
    setIsClosing(false);
    setLightbox({ project, index });
  };

  const closeLightbox = () => {
    // trigger exit animation, then unmount
    setLightboxVisible(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setLightbox(null);
    }, 300);
  };

  const stepLightbox = (delta: number) => {
    if (!lightbox) return;
    const { index, project } = lightbox;
    const total = project.gallery.length;
    const nextIndex = (index + delta + total) % total;

    setLightbox({ project, index: nextIndex });
  };

  useEffect(() => {
    if (lightbox) {
      const id = requestAnimationFrame(() => setLightboxVisible(true));

      return () => cancelAnimationFrame(id);
    }

    return;
  }, [lightbox]);

  // Close on Escape key when lightbox is open
  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <div className="w-full px-0 pb-16 text-slate-900">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 pt-16">
        <div className="absolute inset-0 -z-10 opacity-50 blur-3xl [background:radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.2),transparent_36%),radial-gradient(circle_at_80%_28%,rgba(34,211,238,0.2),transparent_32%),radial-gradient(circle_at_48%_78%,rgba(59,130,246,0.18),transparent_30%)]" />

        <section className="relative overflow-visible px-2 py-6 md:px-4 md:py-10">
          <div className="relative flex h-[360px] items-center md:h-[520px]">
            <div className="absolute top-0 left-0 z-10 max-w-xl space-y-4 md:space-y-5">
              <h1
                className={`${lato.className} text-8xl leading-[0.9] font-semibold text-slate-900 max-sm:mt-[-30px] max-sm:text-6xl sm:mt-[-50px] md:mt-[-70px] md:mr-20 md:text-9xl lg:mt-[-77px]`}
              >
                Portofolio
              </h1>
              <div className="mr-80 max-sm:mr-140 sm:mr-110 md:mr-110 lg:mr-90 xl:mr-80">
                <p
                  className={`${lato.className} md:text-md text-center text-base text-slate-700 lg:text-lg`}
                >
                  Temukan beragam properti, dari hunian hingga komersial, yang
                  disesuaikan dengan preferensi Anda.
                </p>
              </div>
              <div className="h-14 border-l-2 border-slate-300 max-sm:hidden sm:ml-17 md:ml-16 lg:ml-26 xl:ml-33" />
            </div>

            <div className="absolute top-0 right-0 h-[500px] w-3/4 overflow-hidden rounded-[30px] border border-slate-200 bg-slate-100">
              <div
                className={`${lato.className} absolute inset-3 rounded-[24px]`}
              />
              <div
                aria-label="Hero proyek"
                className={`${lato.className} h-full w-full bg-cover bg-center`}
                style={{
                  backgroundImage: "url('/images/general/portfolio.jpg')",
                }}
              />
            </div>
          </div>
        </section>

        <section className={`${lato.className} grid gap-4 md:grid-cols-3`}>
          {[
            { label: "+40", desc: "Proyek selesai" },
            { label: "12", desc: "Kota dilayani" },
            { label: "98%", desc: "Sesuai Jadwal" },
          ].map((stat) => (
            <div
              className={`${lato.className} relative overflow-hidden rounded-2xl border border-cyan-100 bg-white/85 px-6 py-5 shadow-md`}
              key={stat.desc}
            >
              <div
                className={`${lato.className} pointer-events-none absolute inset-0 opacity-50 blur-3xl [background:radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.16),transparent_36%)]`}
              />
              <div className="relative">
                <p
                  className={`${lato.className} text-3xl font-semibold text-slate-900`}
                >
                  {stat.label}
                </p>
                <p className={`${lato.className} text-sm text-slate-700`}>
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl border border-cyan-100 bg-white/85 px-6 py-8 shadow-xl">
          <div className="pointer-events-none absolute inset-0 opacity-60 blur-3xl [background:radial-gradient(circle_at_10%_12%,rgba(14,165,233,0.16),transparent_36%),radial-gradient(circle_at_88%_18%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.14),transparent_30%)]" />
          <div className="relative mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p
                className={`${lato.className} text-xs tracking-[0.16em] text-cyan-700 uppercase`}
              >
                Katalog proyek
              </p>
              <h2
                className={`${lato.className} text-3xl font-semibold text-slate-900 md:text-4xl`}
              >
                Proyek unggulan CV Pandan Sembilan
              </h2>
              <p
                className={`${lato.className} text-sm text-slate-700 md:text-base`}
              >
                Tampilan abstrak namun rapi, menonjolkan pekerjaan aktual yang
                telah kami selesaikan.
              </p>
            </div>
            <div className={`${lato.className} flex flex-wrap gap-2`}>
              {categories.map((cat) => (
                <button
                  className={`${lato.className} rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    activeCategory === cat
                      ? "border-cyan-500 bg-cyan-500 text-white shadow"
                      : "border-cyan-200 bg-white text-cyan-800 hover:border-cyan-400"
                  }`}
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`${lato.className} relative grid gap-5 md:grid-cols-2`}
          >
            {isProjectsLoading
              ? [0, 1, 2, 3].map((idx) => (
                  <div
                    className={`${lato.className} relative overflow-hidden rounded-3xl border border-cyan-100 bg-white/90 p-5 shadow-md ${idx % 3 === 0 ? "md:col-span-2" : ""}`}
                    key={`skeleton-${idx}`}
                  >
                    <Skeleton isLoaded={false}>
                      <div className="grid h-48 grid-cols-3 grid-rows-2 gap-2 rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-2" />
                    </Skeleton>
                    <div className="mt-4 space-y-3">
                      <Skeleton isLoaded={false}>
                        <div className="h-3 w-24 rounded-full" />
                      </Skeleton>
                      <Skeleton isLoaded={false}>
                        <div className="h-6 w-56 rounded-full" />
                      </Skeleton>
                      <Skeleton isLoaded={false}>
                        <div className="h-4 w-40 rounded-full" />
                      </Skeleton>
                    </div>
                  </div>
                ))
              : filteredProjects.map((project, idx) => (
                  <div
                    className={`${lato.className} group relative overflow-hidden rounded-3xl border border-cyan-100 bg-white/90 p-5 shadow-md transition hover:-translate-y-1 hover:border-cyan-400/80 ${
                      idx % 3 === 0 ? "md:col-span-2" : ""
                    }`}
                    key={project.title}
                  >
                    <div
                      className={`${lato.className} pointer-events-none absolute inset-0 opacity-45 blur-2xl [background:radial-gradient(circle_at_25%_15%,rgba(14,165,233,0.14),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.12),transparent_36%)]`}
                    />
                    <div
                      className={`${lato.className} relative flex flex-col gap-4`}
                    >
                      <div
                        className={`${lato.className} grid auto-rows-[12rem] grid-cols-3 gap-2 rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-2 shadow-inner`}
                      >
                        {project.gallery.length === 0 ? (
                          <div className="col-span-3 row-span-2 flex h-full w-full items-center justify-center rounded-xl border border-cyan-100 bg-white/70 text-sm font-semibold text-cyan-900">
                            Galeri Proyek Kosong
                          </div>
                        ) : (
                          project.gallery.map((img, imageIdx) => {
                            const key = `${project.title}-${imageIdx}`;
                            const loaded = !!loadedImages[key];

                            return (
                              <button
                                aria-label={`Perbesar foto ${project.title}`}
                                className={`${lato.className} relative h-48 overflow-hidden rounded-xl border border-white/60 bg-slate-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
                                key={`${project.title}-${imageIdx}`}
                                onClick={() => openLightbox(project, imageIdx)}
                                type="button"
                              >
                                {!loaded && (
                                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                                    <Spinner color="primary" />
                                  </div>
                                )}
                                <img
                                  alt={project.title}
                                  src={img}
                                  className={`h-full w-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
                                  onLoad={() =>
                                    setLoadedImages((prev) => ({
                                      ...prev,
                                      [key]: true,
                                    }))
                                  }
                                  onError={() =>
                                    setLoadedImages((prev) => ({
                                      ...prev,
                                      [key]: true,
                                    }))
                                  }
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-100/20" />
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 select-none">
                                  <span
                                    className={`${lato.className} text-center text-3xl font-extrabold tracking-widest text-white/10 uppercase sm:text-5xl md:text-6xl lg:text-7xl`}
                                  >
                                    CV PANDAN SEMBILAN
                                  </span>
                                </div>
                              </button>
                            );
                          })
                        )}
                      </div>

                      <div
                        className={`${lato.className} flex items-start justify-between gap-3`}
                      >
                        <div className={`${lato.className} space-y-1`}>
                          <p
                            className={`${lato.className} text-xs tracking-[0.14em] text-cyan-700 uppercase`}
                          >
                            {project.category}
                          </p>
                          <h3
                            className={`${lato.className} text-xl font-semibold text-slate-900 md:text-2xl`}
                          >
                            {project.title}
                          </h3>
                          <p
                            className={`${lato.className} text-sm text-slate-700`}
                          >
                            {project.location} · {project.year} ·{" "}
                            {project.status}
                          </p>
                        </div>
                        <span className="rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-semibold text-cyan-800 shadow-sm">
                          {project.scope[0]}
                        </span>
                      </div>

                      <div
                        className={`${lato.className} flex flex-wrap gap-2 text-xs text-cyan-900`}
                      >
                        {project.scope.map((tag) => (
                          <span
                            className={`${lato.className} rounded-full border border-cyan-200 bg-white px-3 py-1 font-semibold shadow-sm`}
                            key={`${project.title}-${tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div
                        className={`${lato.className} flex items-center justify-between text-sm text-cyan-800`}
                      >
                        <span
                          className={`${lato.className} inline-flex items-center gap-2 font-semibold`}
                        >
                          <span
                            className={`${lato.className} h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]`}
                          />
                          {project.status?.toLowerCase() === "selesai"
                            ? "Aktif & siap untuk proyek berikutnya"
                            : "Mohon menunggu untuk proyek seperti ini"}
                        </span>
                        <Button
                          as="a"
                          href={"/contact"}
                          className={`${lato.className} inline-flex items-center gap-2 rounded-full border border-cyan-400 bg-white px-3 py-1 font-semibold text-cyan-800 transition hover:bg-cyan-50`}
                        >
                          Diskusikan proyek serupa
                          <span aria-hidden>→</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </div>

      {lightbox && (
        <div
          aria-modal="true"
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm transition-opacity duration-300 ${lightboxVisible && !isClosing ? "bg-slate-900/70 opacity-100" : "bg-slate-900/0 opacity-0"}`}
          role="dialog"
        >
          {/* Backdrop button to allow click-to-close without violating a11y rules */}
          <button
            aria-label="Tutup galeri"
            type="button"
            className="absolute inset-0 z-10 h-full w-full bg-transparent"
            onClick={closeLightbox}
          />
          <div
            className={`relative z-20 w-full max-w-4xl transform overflow-hidden rounded-3xl border border-cyan-100 bg-white/95 shadow-2xl transition-all duration-300 ease-out ${lightboxVisible && !isClosing ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"}`}
          >
            <div className="pointer-events-none absolute inset-0 opacity-60 blur-3xl [background:radial-gradient(circle_at_12%_20%,rgba(14,165,233,0.16),transparent_35%),radial-gradient(circle_at_88%_25%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.14),transparent_32%)]" />
            <div className="relative flex flex-col gap-4 p-4 md:p-6">
              <div
                className={`${lato.className} flex items-start justify-between gap-4`}
              >
                <div>
                  <p
                    className={`${lato.className} text-xs tracking-[0.14em] text-cyan-700 uppercase`}
                  >
                    {lightbox.project.category}
                  </p>
                  <h3
                    className={`${lato.className} text-xl font-semibold text-slate-900 md:text-2xl`}
                  >
                    {lightbox.project.title}
                  </h3>
                  <p className={`${lato.className} text-sm text-slate-700`}>
                    {lightbox.project.location} · {lightbox.project.year} ·{" "}
                    {lightbox.project.status}
                  </p>
                </div>
                <button
                  aria-label="Tutup"
                  className={`${lato.className} rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-800`}
                  onClick={closeLightbox}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div
                className={`${lato.className} relative h-[420px] overflow-hidden rounded-2xl border border-cyan-100 bg-slate-100`}
              >
                <img
                  alt={lightbox.project.title}
                  className="h-full w-full object-cover"
                  src={lightbox.project.gallery[lightbox.index]}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-white/10" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 select-none">
                  <span
                    className={`${lato.className} text-center text-3xl font-extrabold tracking-widest text-white/10 uppercase sm:text-5xl md:text-6xl lg:text-7xl`}
                  >
                    CV PANDAN SEMBILAN
                  </span>
                </div>

                <div
                  className={`${lato.className} absolute inset-y-0 left-0 flex items-center p-4`}
                >
                  <button
                    aria-label="Sebelumnya"
                    className={`${lato.className} rounded-full border border-white/50 bg-white/80 px-3 py-2 text-lg font-semibold text-slate-800 shadow transition hover:-translate-y-0.5 hover:bg-white`}
                    onClick={() => stepLightbox(-1)}
                    type="button"
                  >
                    ‹
                  </button>
                </div>
                <div
                  className={`${lato.className} absolute inset-y-0 right-0 flex items-center p-4`}
                >
                  <button
                    aria-label="Berikutnya"
                    className={`${lato.className} rounded-full border border-white/50 bg-white/80 px-3 py-2 text-lg font-semibold text-slate-800 shadow transition hover:-translate-y-0.5 hover:bg-white`}
                    onClick={() => stepLightbox(1)}
                    type="button"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div
                className={`${lato.className} flex items-center justify-between text-sm text-slate-700`}
              >
                <div className={`${lato.className} flex flex-wrap gap-2`}>
                  {lightbox.project.scope.map((tag) => (
                    <span
                      className={`${lato.className} rounded-full border border-cyan-200 bg-white px-3 py-1 font-semibold text-cyan-800 shadow-sm`}
                      key={`${lightbox.project.title}-${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className={`${lato.className} text-xs font-semibold text-cyan-800`}
                >
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
