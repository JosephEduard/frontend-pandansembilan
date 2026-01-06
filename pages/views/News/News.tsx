import { useEffect, useMemo, useState } from "react";
import { Lato } from "next/font/google";

import serviceNews from "@/services/news.service";
import environment from "@/config/environment";
import endpoint from "@/services/endpoint.constant";

type BackendNews = {
  _id?: string;
  title?: string;
  text?: string;
  image?: string;
  date?: string | Date;
};

type Article = {
  title: string;
  category: string;
  date: string;
  summary: string;
  image?: string;
  cta?: string;
  rawDate?: string | Date;
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

// Helper: format date to DD/MM/YYYY HH:MM WIB (Asia/Jakarta)
const formatJakartaDateShort = (input?: string | Date): string => {
  if (!input) return "";
  const date = typeof input === "string" ? new Date(input) : input;

  try {
    const id = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    // Ensure 24h without AM/PM
    return `${id} WIB`;
  } catch {
    return String(input);
  }
};

// Helper: infer category from title keywords
const inferCategory = (title?: string): string => {
  if (!title) return "Umum";
  const t = title.toLowerCase();

  if (t.includes("layanan")) return "Layanan";
  if (t.includes("proyek")) return "Proyek";
  if (t.includes("pers")) return "Pers";
  if (t.includes("acara")) return "Acara";

  return "Umum";
};

const resolveImageUrl = (image?: string): string | undefined => {
  if (!image) return undefined;
  const isAbsolute = /^https?:\/\//i.test(image);

  if (isAbsolute) return image;
  if (!environment.API_URL) return undefined;

  return `${environment.API_URL}${endpoint.MEDIA}/${image}`;
};

const News = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Animate in when modal opens
  useEffect(() => {
    if (selected) {
      setIsClosing(false);
      // next frame to allow transition
      const id = requestAnimationFrame(() => setAnimateIn(true));

      return () => cancelAnimationFrame(id);
    } else {
      setAnimateIn(false);
    }
  }, [selected]);

  // Close helpers (with exit animation)
  const closeModal = () => {
    setIsClosing(true);
    setAnimateIn(false);
    window.setTimeout(() => setSelected(null), 200);
  };

  // Close on ESC
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Fetch news from backend and map to template shape
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await serviceNews.getNews("");
        const payload = (res?.data?.data ?? res?.data ?? []) as BackendNews[];

        const mapped: Article[] = (Array.isArray(payload) ? payload : [])
          .map((n) => ({
            title: n.title ?? "",
            category: inferCategory(n.title),
            date: formatJakartaDateShort(n.date),
            summary: n.text ?? "",
            image: resolveImageUrl(n.image),
            rawDate: n.date,
          }))
          .filter((a) => a.title || a.summary);

        setArticles(mapped);
      } catch (error) {
        console.error("[News] fetch error", error);
        setArticles([]);
      }
    };

    fetchNews();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();

    articles.forEach((a) => set.add(a.category));

    return ["Semua", ...Array.from(set)];
  }, [articles]);

  const filteredFeatured = useMemo(() => {
    const source =
      activeCategory === "Semua"
        ? articles
        : articles.filter((article) => article.category === activeCategory);

    return source.slice(0, 3);
  }, [activeCategory, articles]);

  const filteredUpdates = useMemo(() => {
    const source =
      activeCategory === "Semua"
        ? articles
        : articles.filter((article) => article.category === activeCategory);

    return source.slice(3);
  }, [activeCategory, articles]);

  // Count news within the last 3 months
  const updatesLast3Months = useMemo(() => {
    const now = new Date();
    const threeMonthsAgo = new Date(now);

    threeMonthsAgo.setMonth(now.getMonth() - 3);

    return articles.filter((a) => {
      const raw = a.rawDate ?? a.date;
      const parsed = new Date(raw as any);

      return (
        !isNaN(parsed.getTime()) && parsed >= threeMonthsAgo && parsed <= now
      );
    }).length;
  }, [articles]);

  return (
    <div className="w-full px-0 py-10 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <section className="rounded-3xl border border-cyan-100 bg-white/70 px-8 py-10 shadow-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p
                className={`${lato.className} text-sm tracking-[0.18em] text-cyan-700 uppercase`}
              >
                Ruang Berita
              </p>
              <h1
                className={`${lato.className} text-3xl leading-tight font-semibold text-slate-900 md:text-4xl`}
              >
                Berita resmi CV Pandan Sembilan
              </h1>
              <p
                className={`${lato.className} max-w-3xl text-lg text-slate-800`}
              >
                Pembaruan layanan konstruksi, serah-terima proyek, dan siaran
                pers resmi. Semua konten berasal langsung dari CV Pandan
                Sembilan.
              </p>
              <div className={`${lato.className} flex flex-wrap gap-3`}>
                {categories.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <button
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border-cyan-600 bg-cyan-600 text-white"
                          : "border-cyan-200 bg-white text-slate-800 hover:bg-cyan-100"
                      }`}
                      key={category}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid w-full max-w-sm grid-cols-2 gap-4 rounded-2xl border border-cyan-100 bg-white/70 p-4 text-sm text-slate-800 shadow-md">
              <div>
                <p
                  className={`${lato.className} text-xs tracking-[0.12em] text-cyan-700 uppercase`}
                >
                  Pembaruan
                </p>
                <p
                  className={`${lato.className} text-2xl font-semibold text-slate-900`}
                >
                  {updatesLast3Months}
                </p>
                <p className={`${lato.className} text-xs text-slate-600`}>
                  dikirim kuartal terakhir
                </p>
              </div>
              <div>
                <p
                  className={`${lato.className} text-xs tracking-[0.12em] text-cyan-700 uppercase`}
                >
                  Pelanggan
                </p>
                <p
                  className={`${lato.className} text-2xl font-semibold text-slate-900`}
                >
                  100+
                </p>
                <p className={`${lato.className} text-xs text-slate-600`}>
                  aktif menggunakan layanan
                </p>
              </div>
              <div>
                <p
                  className={`${lato.className} text-xs tracking-[0.12em] text-cyan-700 uppercase`}
                >
                  Uptime
                </p>
                <p
                  className={`${lato.className} text-2xl font-semibold text-slate-900`}
                >
                  99.99%
                </p>
                <p className={`${lato.className} text-xs text-slate-600`}>
                  keandalan dijamin
                </p>
              </div>
              <div>
                <p
                  className={`${lato.className} text-xs tracking-[0.12em] text-cyan-700 uppercase`}
                >
                  Acara
                </p>
                <p
                  className={`${lato.className} text-2xl font-semibold text-slate-900`}
                >
                  5
                </p>
                <p className={`${lato.className} text-xs text-slate-600`}>
                  lokakarya akan datang
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFeatured.map((article) => (
            <div
              aria-label={`Buka detail berita: ${article.title}`}
              className={`${lato.className} flex cursor-pointer flex-col rounded-3xl border border-cyan-100 bg-white/80 p-3 shadow-md transition hover:-translate-y-1 hover:border-cyan-400/80 sm:p-6`}
              key={article.title}
              onClick={() => setSelected(article)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(article);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div
                aria-label={`Slot gambar untuk ${article.title}`}
                className={`${lato.className} mb-3 h-40 w-full overflow-hidden rounded-2xl border border-dashed border-cyan-200 bg-white/70 sm:h-56 md:h-64`}
              >
                {article.image ? (
                  <img
                    alt={article.title}
                    className="h-full w-full rounded-2xl object-cover"
                    src={article.image}
                  />
                ) : (
                  <div
                    className={`${lato.className} flex h-full items-center justify-center px-3 text-center text-sm text-slate-500`}
                  >
                    Sisipkan foto proyek/layanan (16:9)
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div
                  className={`${lato.className} flex flex-wrap items-center justify-between gap-2 text-xs tracking-[0.12em] text-slate-600 uppercase`}
                >
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">
                    {article.category}
                  </span>
                  <span>{article.date}</span>
                </div>
                <h2
                  className={`${lato.className} text-base font-semibold [overflow-wrap:anywhere] text-slate-900 sm:text-lg md:text-xl`}
                >
                  {article.title}
                </h2>
                <p
                  className={`${lato.className} [display:-webkit-box] overflow-hidden text-sm leading-relaxed [overflow-wrap:anywhere] text-slate-700 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:[-webkit-line-clamp:3] md:[-webkit-line-clamp:4]`}
                >
                  {article.summary}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 rounded-3xl border border-cyan-100 bg-white/70 p-6 shadow-lg lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <div
              className={`${lato.className} flex items-center justify-between`}
            >
              <div>
                <p
                  className={`${lato.className} text-xs tracking-[0.14em] text-cyan-700 uppercase`}
                >
                  Pembaruan terbaru
                </p>
                <h3
                  className={`${lato.className} text-2xl font-semibold text-slate-900`}
                >
                  Hal-hal yang kami kirimkan
                </h3>
              </div>
              <button
                className={`${lato.className} text-sm font-semibold text-cyan-700 underline-offset-4 transition hover:text-cyan-900 hover:underline`}
              >
                Berlangganan
              </button>
            </div>
            <div
              className={`${lato.className} flex flex-col divide-y divide-cyan-100`}
            >
              {filteredUpdates.map((article) => (
                <div
                  aria-label={`Buka detail pembaruan: ${article.title}`}
                  className={`${lato.className} grid cursor-pointer grid-cols-1 gap-3 py-4 sm:grid-cols-[150px_1fr]`}
                  key={article.title}
                  onClick={() => setSelected(article)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(article);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    aria-label={`Slot gambar untuk ${article.title}`}
                    className="h-48 w-full overflow-hidden rounded-xl border border-dashed border-cyan-200 bg-white/70 sm:h-40"
                  >
                    {article.image ? (
                      <img
                        alt={article.title}
                        className="h-full w-full rounded-xl object-cover"
                        src={article.image}
                      />
                    ) : (
                      <div
                        className={`${lato.className} flex h-full items-center justify-center px-2 text-center text-xs text-slate-500`}
                      >
                        Foto pendukung (16:9)
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className={`${lato.className} flex flex-wrap items-center gap-3 text-xs tracking-[0.12em] text-slate-600 uppercase`}
                    >
                      <span
                        className={`${lato.className} rounded-full bg-cyan-50 px-3 py-1 text-cyan-700`}
                      >
                        {article.category}
                      </span>
                      <span>{article.date}</span>
                    </div>
                    <h4
                      className={`${lato.className} text-base font-semibold break-words text-slate-900 sm:text-lg`}
                    >
                      {article.title}
                    </h4>
                    <p
                      className={`${lato.className} [display:-webkit-box] overflow-hidden text-sm break-words text-slate-700 [-webkit-box-orient:vertical] [-webkit-line-clamp:3]`}
                    >
                      {article.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`${lato.className} space-y-4 rounded-2xl border border-cyan-100 bg-white/70 p-5`}
          >
            <div>
              <p
                className={`${lato.className} text-xs tracking-[0.14em] text-cyan-700 uppercase`}
              >
                Pers & Sumber Daya
              </p>
              <h3
                className={`${lato.className} text-xl font-semibold text-slate-900`}
              >
                Untuk Media & Analis
              </h3>
            </div>
            <div className="space-y-4" />
            <a
              className={`${lato.className} block w-full rounded-xl border border-cyan-200 bg-white p-4 text-sm text-cyan-900 shadow-sm transition hover:bg-cyan-50`}
              href="/contact"
            >
              <p className={`${lato.className} font-semibold text-slate-900`}>
                Kontak Pers
              </p>
              <p className={`${lato.className} text-cyan-800`}>
                cv.pandansembilan10@gmail.com
              </p>
              <p className={`${lato.className} text-slate-700`}>
                Untuk wawancara, permintaan data, atau briefing analis.
              </p>
            </a>
          </div>
        </section>
      </div>
      {selected && (
        <div
          aria-label="Tutup dialog berita"
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm transition-opacity duration-200 ${
            animateIn && !isClosing
              ? "bg-slate-900/70 opacity-100"
              : "bg-slate-900/70 opacity-0"
          }`}
          onClick={(e) => {
            // close only when clicking on the backdrop itself
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              closeModal();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div
            aria-modal="true"
            className={`relative w-full max-w-3xl transform overflow-hidden rounded-3xl border border-cyan-100 bg-white/95 shadow-2xl transition-all duration-200 ${
              animateIn && !isClosing
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-2 scale-95 opacity-0"
            }`}
            role="dialog"
            tabIndex={-1}
          >
            <div className="relative flex max-h-[85vh] flex-col gap-4 overflow-y-auto p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className={`${lato.className} text-xl font-semibold text-slate-900 md:text-2xl`}
                  >
                    {selected.title}
                  </h3>
                  <p className={`${lato.className} text-sm text-slate-700`}>
                    {selected.date}
                  </p>
                </div>
                <button
                  aria-label="Tutup"
                  className={`${lato.className} rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-800`}
                  onClick={closeModal}
                  type="button"
                >
                  ✕
                </button>
              </div>
              {selected.image && (
                <div className="relative h-72 overflow-hidden rounded-2xl border border-cyan-100 bg-slate-100 md:h-96">
                  <img
                    alt={selected.title}
                    className="h-full w-full object-cover"
                    src={selected.image}
                  />
                </div>
              )}
              <div>
                <p
                  className={`${lato.className} text-sm leading-relaxed break-words whitespace-pre-line text-slate-800`}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {selected.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
