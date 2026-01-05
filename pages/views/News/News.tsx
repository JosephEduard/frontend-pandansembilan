import { useMemo, useState } from "react";
import { Lato } from "next/font/google";

type Article = {
  title: string;
  category: string;
  date: string;
  summary: string;
  cta?: string;
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const categories = ["Semua", "Layanan", "Proyek", "Pers", "Acara"];

const featuredArticles: Article[] = [
  {
    title: "Serah terima proyek gedung perkantoran CBD",
    category: "Proyek",
    date: "Ags 2024",
    summary:
      "CV Pandan Sembilan menyelesaikan pembangunan struktur dan interior fit-out tepat waktu dengan standar keselamatan tertinggi.",
    cta: "Lihat dokumentasi",
  },
  {
    title: "Layanan konstruksi hijau untuk kawasan industri",
    category: "Layanan",
    date: "Jul 2024",
    summary:
      "Paket EPC ramah lingkungan yang mengutamakan efisiensi energi, pengelolaan limbah, dan material bersertifikasi.",
    cta: "Pelajari layanan",
  },
  {
    title: "CV Pandan Sembilan di Expo Infrastruktur",
    category: "Acara",
    date: "Sep 2024",
    summary:
      "Tim memamerkan portofolio gedung komersial, fasilitas publik, dan solusi konstruksi cepat untuk kebutuhan darurat.",
    cta: "Jadwalkan kunjungan",
  },
];

const updates: Article[] = [
  {
    title: "Groundbreaking pabrik manufaktur di Karawang",
    category: "Proyek",
    date: "19 Ags 2024",
    summary:
      "Pekerjaan pondasi dalam dimulai dengan metode bored pile untuk meminimalkan getaran ke area sekitar.",
  },
  {
    title: "Kemitraan supplier baja lokal",
    category: "Pers",
    date: "02 Ags 2024",
    summary:
      "Kolaborasi strategis untuk menjaga ketahanan pasokan material struktural dengan kualitas teruji.",
  },
  {
    title: "Unit layanan cepat perbaikan gedung",
    category: "Layanan",
    date: "25 Jul 2024",
    summary:
      "Tim mobile siap tangani perbaikan fasad, waterproofing, dan MEP ringan untuk properti komersial.",
  },
];

const pressKits: Article[] = [
  {
    title: "Aset merek & profil perusahaan",
    category: "Pers",
    date: "Diperbarui bulanan",
    summary:
      "Logo CV Pandan Sembilan, foto proyek, profil pimpinan, dan panduan penggunaan merek.",
    cta: "Unduh kit",
  },
  {
    title: "Lembar fakta CV Pandan Sembilan",
    category: "Pers",
    date: "Q3 2024",
    summary:
      "Ringkasan layanan konstruksi, sektor yang dilayani, dan capaian proyek unggulan.",
    cta: "Lihat PDF",
  },
];

// Swagger fetch template (GET /news → daftar berita dari backend-cvps)
// const fetchNewsFeed = async () => {
//   try {
//     const response = await fetch(
//       "https://backend-cvps.vercel.app/api/news",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN ?? ""}`,
//         },
//       },
//     );
//     if (!response.ok) throw new Error("Failed to fetch news feed");
//     const payload = await response.json();
//     // setDynamicNews(payload.data);
//   } catch (error) {
//     console.error("[NewsView] fetchNewsFeed", error);
//   }
// };

const News = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  // Template siap pakai (hubungkan ke backend Anda):
  // useEffect(() => {
  //   const sendVisit = async () => {
  //     try {
  //       await fetch("/api/visit", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ path: "/news", section: "news", source: "site" }),
  //       });
  //     } catch (err) {
  //       console.error("visit log failed", err);
  //     }
  //   };
  //   sendVisit();
  // }, []);

  const filteredFeatured = useMemo(() => {
    if (activeCategory === "Semua") return featuredArticles;

    return featuredArticles.filter(
      (article) => article.category === activeCategory,
    );
  }, [activeCategory]);

  const filteredUpdates = useMemo(() => {
    if (activeCategory === "Semua") return updates;

    return updates.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

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
                  12
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
                  180+
                </p>
                <p className={`${lato.className} text-xs text-slate-600`}>
                  aktif menggunakan Pandan
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
                  keandalan dijamin SLA
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

        <section className="grid gap-6 lg:grid-cols-3">
          {filteredFeatured.map((article) => (
            <div
              className={`${lato.className} flex h-full flex-col justify-between rounded-3xl border border-cyan-100 bg-white/80 p-6 shadow-md transition hover:-translate-y-1 hover:border-cyan-400/80`}
              key={article.title}
            >
              <div
                aria-label={`Slot gambar untuk ${article.title}`}
                className={`${lato.className} mb-4 aspect-[16/9] w-full rounded-2xl border border-dashed border-cyan-200 bg-white/70`}
              >
                <div
                  className={`${lato.className} flex h-full items-center justify-center px-3 text-center text-sm text-slate-500`}
                >
                  Sisipkan foto proyek/layanan (16:9)
                </div>
              </div>
              <div className="space-y-3">
                <div
                  className={`${lato.className} flex items-center justify-between text-xs tracking-[0.12em] text-slate-600 uppercase`}
                >
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">
                    {article.category}
                  </span>
                  <span>{article.date}</span>
                </div>
                <h2
                  className={`${lato.className} text-xl font-semibold text-slate-900`}
                >
                  {article.title}
                </h2>
                <p
                  className={`${lato.className} text-sm leading-relaxed text-slate-700`}
                >
                  {article.summary}
                </p>
              </div>
              {article.cta && (
                <button
                  className={`${lato.className} mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 underline-offset-4 transition hover:text-cyan-900 hover:underline`}
                >
                  {article.cta}
                  <span aria-hidden>→</span>
                </button>
              )}
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
                  className={`${lato.className} grid grid-cols-[120px_1fr] gap-3 py-4 sm:grid-cols-[150px_1fr]`}
                  key={article.title}
                >
                  <div
                    aria-label={`Slot gambar untuk ${article.title}`}
                    className="aspect-video rounded-xl border border-dashed border-cyan-200 bg-white/70"
                  >
                    <div
                      className={`${lato.className} flex h-full items-center justify-center px-2 text-center text-xs text-slate-500`}
                    >
                      Foto pendukung (16:9)
                    </div>
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
                      className={`${lato.className} text-lg font-semibold text-slate-900`}
                    >
                      {article.title}
                    </h4>
                    <p className={`${lato.className} text-sm text-slate-700`}>
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
                Pers & sumber daya
              </p>
              <h3
                className={`${lato.className} text-xl font-semibold text-slate-900`}
              >
                Untuk media & analis
              </h3>
            </div>
            <div className="space-y-4">
              {pressKits.map((item) => (
                <div
                  className={`${lato.className} rounded-xl border border-cyan-100 bg-white/80 p-4 shadow-sm`}
                  key={item.title}
                >
                  <div
                    className={`${lato.className} flex items-center justify-between text-xs tracking-[0.12em] text-slate-600 uppercase`}
                  >
                    <span
                      className={`${lato.className} rounded-full bg-cyan-50 px-3 py-1 text-cyan-700`}
                    >
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h4
                    className={`${lato.className} pt-3 text-lg font-semibold text-slate-900`}
                  >
                    {item.title}
                  </h4>
                  <p className={`${lato.className} text-sm text-slate-700`}>
                    {item.summary}
                  </p>
                  {item.cta && (
                    <button
                      className={`${lato.className} mt-3 text-sm font-semibold text-cyan-700 underline-offset-4 transition hover:text-cyan-900 hover:underline`}
                    >
                      {item.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div
              className={`${lato.className} rounded-xl border border-cyan-200 bg-white p-4 text-sm text-cyan-900 shadow-sm`}
            >
              <p className={`${lato.className} font-semibold text-slate-900`}>
                Kontak pers
              </p>
              <p className={`${lato.className} text-cyan-800`}>
                media@pandan.com
              </p>
              <p className={`${lato.className} text-slate-700`}>
                Untuk wawancara, permintaan data, atau briefing analis.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default News;
