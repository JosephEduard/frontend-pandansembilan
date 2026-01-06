import { Lato } from "next/font/google";
import { useQuery } from "@tanstack/react-query";

import serviceServices from "@/services/service";
type ServiceItem = {
  title: string;
  description: string;
  icon: string;
  banner?: string;
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const iconForName = (name?: string) => {
  const n = (name || "").toLowerCase();

  if (n.includes("rencan")) return "📐"; // Perencanaan
  if (n.includes("bangun")) return "🏗️"; // Pembangunan
  if (n.includes("renov")) return "🪚"; // Renovasi
  if (n.includes("pelihara")) return "🛠️"; // Pemeliharaan
  if (n.includes("listrik")) return "⚡"; // Kelistrikan

  return "🏗️";
};

const Services = () => {
  const { data: servicesData } = useQuery({
    queryKey: ["ServicesPublicList"],
    queryFn: async () => {
      const res = await serviceServices.getServices("page=1&limit=999");

      return res.data;
    },
  });

  const services: ServiceItem[] = (servicesData?.data || []).map(
    (svc: any) => ({
      title: svc?.name ?? "",
      description: svc?.description ?? "",
      icon: iconForName(svc?.name),
      banner: typeof svc?.banner === "string" ? svc.banner : undefined,
    }),
  );

  return (
    <div className="w-full px-0 pb-16 text-slate-900">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 pt-16">
        <div className="absolute inset-0 -z-10 opacity-50 blur-3xl [background:radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.2),transparent_36%),radial-gradient(circle_at_80%_28%,rgba(34,211,238,0.2),transparent_32%),radial-gradient(circle_at_48%_78%,rgba(59,130,246,0.18),transparent_30%)]" />

        <section className="relative overflow-visible px-2 py-6 md:px-4 md:py-10">
          <div className="relative flex h-[360px] items-center md:h-[480px]">
            <div
              className={`${lato.className} absolute top-0 left-0 z-10 max-w-2xl space-y-4 md:space-y-5`}
            >
              <p
                className={`${lato.className} text-xs tracking-[0.18em] text-cyan-700 uppercase`}
              >
                Layanan CV Pandan Sembilan
              </p>
              <h1
                className={`${lato.className} text-5xl leading-[1.05] font-semibold text-slate-900 md:text-6xl`}
              >
                Solusi konstruksi yang adaptif dan tepat guna
              </h1>
              <p
                className={`${lato.className} max-w-xl text-base text-slate-700 md:text-lg`}
              >
                Dari perencanaan hingga pemeliharaan, kami memakai pendekatan
                modular, tim spesialis, dan kontrol mutu ketat untuk setiap
                proyek.
              </p>
              <div
                className={`${lato.className} h-14 border-l-2 border-slate-300 max-sm:hidden`}
              />
              <div
                className={`${lato.className} flex flex-wrap gap-3 text-sm text-slate-800 max-sm:hidden`}
              >
                {[
                  "Perencanaan",
                  "Pembangunan",
                  "Renovasi",
                  "Pemeliharaan",
                  "Kelistrikan",
                ].map((chip) => (
                  <span
                    className={`${lato.className} rounded-full border border-cyan-200 bg-white/90 px-3 py-1 font-semibold text-cyan-800 shadow-sm backdrop-blur-sm`}
                    key={chip}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute top-0 right-0 h-full w-1/3 overflow-hidden rounded-[30px] border border-slate-200 bg-slate-100">
              <div className="absolute inset-3 rounded-[24px]" />
              <div
                aria-label="Hero layanan"
                className={`${lato.className} h-full w-full bg-cover bg-center`}
                style={{
                  backgroundImage: "url('/images/general/layanan2.jpg')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/10" />
              </div>
            </div>
          </div>
        </section>

        <section className={`${lato.className} grid gap-4 md:grid-cols-3`}>
          {[
            { label: "5+", desc: "Layanan spesialisasi" },
            { label: "95%", desc: "Kepuasan Klien" },
            { label: "24/7", desc: "Dukungan tersedia" },
          ].map((stat) => (
            <div
              className={`${lato.className} relative overflow-hidden rounded-2xl border border-cyan-100 bg-white/85 px-6 py-5 shadow-md`}
              key={stat.desc}
            >
              <div className="pointer-events-none absolute inset-0 opacity-50 blur-3xl [background:radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.16),transparent_36%)]" />
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

        <section className="space-y-12">
          <div className={`${lato.className} space-y-2 text-center`}>
            <p
              className={`${lato.className} text-xs tracking-[0.16em] text-cyan-700 uppercase`}
            >
              Layanan utama CV Pandan Sembilan
            </p>
            <h2
              className={`${lato.className} text-3xl font-semibold text-slate-900 md:text-4xl`}
            >
              Daftar layanan CV Pandan Sembilan
            </h2>
            <p
              className={`${lato.className} mx-auto max-w-2xl text-sm text-slate-700 md:text-base`}
            >
              Susun ulang ruang dan waktu Anda—dari perencanaan, konstruksi,
              renovasi, pemeliharaan, hingga kelistrikan.
            </p>
          </div>

          {services.map((item, idx) => (
            <div
              className={`${lato.className} group relative flex flex-col gap-6 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center`}
              key={item.title}
            >
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 blur-3xl [background:radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15),transparent_50%)]" />

              <div className="relative w-full md:w-1/2">
                <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-cyan-100/30 via-transparent to-blue-100/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-[32px] border border-cyan-100 bg-white/90 shadow-xl">
                  <div className="absolute inset-2 rounded-[26px] border border-white/60" />
                  <div
                    aria-label={`Foto ${item.title}`}
                    className={`${lato.className} relative h-[320px] w-full bg-cover bg-center md:h-[380px]`}
                    style={{
                      backgroundImage: `url('${
                        item.banner || "/images/general/construction.jpg"
                      }')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-blue-900/5" />
                    <div className="absolute top-6 left-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/80 bg-white/90 shadow-lg backdrop-blur-sm">
                      <span
                        aria-hidden="true"
                        className={`${lato.className} text-4xl`}
                      >
                        {item.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`w-full space-y-5 md:w-1/2 ${idx % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}
              >
                <div
                  className={`${lato.className} inline-flex items-center gap-3 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm`}
                >
                  <span
                    className={`${lato.className} text-xs font-semibold tracking-[0.12em] text-cyan-700 uppercase`}
                  >
                    Layanan {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className={`${lato.className} text-4xl font-semibold text-slate-900 md:text-5xl`}
                >
                  {item.title}
                </h3>

                <p
                  className={`${lato.className} text-base leading-relaxed text-slate-700 md:text-lg`}
                >
                  {item.description}
                </p>

                <div
                  className={`${lato.className} flex items-center gap-4 pt-2`}
                >
                  <span
                    className={`${lato.className} inline-flex items-center gap-2 text-sm font-semibold text-cyan-800`}
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                    Tersedia
                  </span>
                  <a
                    className={`${lato.className} group inline-flex items-center gap-2 rounded-full border border-cyan-400 bg-white px-5 py-2 font-semibold text-cyan-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-md`}
                    href="/contact"
                  >
                    Konsultasi sekarang
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-white/85 p-6 shadow-xl md:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-50 blur-3xl [background:radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.14),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.12),transparent_36%)]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className={`${lato.className} space-y-3`}>
              <p
                className={`${lato.className} text-xs tracking-[0.18em] text-cyan-700 uppercase`}
              >
                Hubungi kami
              </p>
              <h3
                className={`${lato.className} text-2xl font-semibold text-slate-900 md:text-3xl`}
              >
                Siap diskusikan kebutuhan Anda
              </h3>
              <p
                className={`${lato.className} text-sm text-slate-700 md:text-base`}
              >
                Tim kami siap membantu mewujudkan proyek konstruksi Anda dengan
                solusi yang tepat dan terukur.
              </p>
            </div>
            <a
              className={`${lato.className} relative w-full max-w-sm self-start rounded-3xl border border-cyan-200/80 bg-gradient-to-br from-white/95 via-cyan-50/90 to-white/95 p-[1px] shadow-[0_10px_40px_rgba(14,116,144,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_48px_rgba(14,116,144,0.18)] md:self-center`}
              href="/contact"
            >
              <div
                className={`${lato.className} relative rounded-3xl bg-white/90 px-5 py-4`}
              >
                <div
                  className={`${lato.className} pointer-events-none absolute -top-10 -left-10 h-24 w-24 rounded-full bg-cyan-100/40 blur-3xl`}
                />
                <p
                  className={`${lato.className} text-xs tracking-[0.18em] text-cyan-700 uppercase`}
                >
                  Kontak informasi
                </p>
                <p
                  className={`${lato.className} mb-2 text-lg font-semibold text-slate-900`}
                >
                  CV Pandan Sembilan
                </p>
                <p
                  className={`${lato.className} flex items-center gap-2 text-sm text-slate-800`}
                >
                  <span className="text-cyan-600">📧</span>
                  cv.pandansembilan10@gmail.com
                </p>
                <p
                  className={`${lato.className} flex items-center gap-2 text-sm text-slate-800`}
                >
                  <span className="text-cyan-600">📞</span>
                  (+62) 851-0249-8419
                </p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
