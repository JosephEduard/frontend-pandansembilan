import React from "react";
import {
  Target,
  Eye,
  FileCheck,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Lato } from "next/font/google";
import Image from "next/image";

import serviceCertifications from "@/services/certification.service";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const Profile = () => {
  const [certifications, setCertifications] = React.useState<
    Array<{
      _id?: string;
      title?: string;
      description?: string;
      year?: string;
      status?: string | boolean;
      file?: string;
    }>
  >([]);
  const [selectedCert, setSelectedCert] = React.useState<{
    _id?: string;
    title?: string;
    description?: string;
    year?: string;
    status?: string | boolean;
    file?: string;
  } | null>(null);

  const getCertifications = React.useCallback(async () => {
    try {
      const { data } =
        await serviceCertifications.getCertifications("page=1&limit=50");
      const list = Array.isArray(data?.data) ? data.data : [];

      setCertifications(list);
    } catch (e) {
      setCertifications([]);
    }
  }, []);

  const getCertificationsById = React.useCallback(
    async (id: string) => {
      try {
        const { data } = await serviceCertifications.getCertificationsById(id);
        const item = data?.data || data;

        setSelectedCert(item);
      } catch (e) {
        const fallback = certifications.find((c) => c._id === id) || null;

        setSelectedCert(fallback);
      }
    },
    [certifications],
  );

  React.useEffect(() => {
    getCertifications();
  }, [getCertifications]);

  return (
    <div className="min-h-screen bg-white">
      {/* Company Profile Section */}
      <section className="relative px-6 py-20" id="profile">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2
              className={`${lato.className} mb-4 text-4xl font-bold text-gray-800 md:text-5xl`}
            >
              Profil Perusahaan
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-blue-600" />
          </div>

          <div className="mb-16 flex flex-col gap-8">
            <div className="rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3
                className={`${lato.className} mb-4 text-2xl font-bold text-gray-800`}
              >
                Identitas Perusahaan
              </h3>
              <p
                className={`${lato.className} text-justify text-base leading-relaxed text-gray-600 sm:text-lg`}
              >
                CV Pandan Sembilan adalah perusahaan konstruksi yang berkembang
                pesat dan berkomitmen menghadirkan solusi pembangunan yang
                berkualitas tinggi, efisien, dan berstandar keselamatan yang
                baik. Sejak awal berdirinya, perusahaan ini dibangun dengan
                tujuan menjadi mitra tepercaya dalam berbagai proyek konstruksi,
                baik untuk sektor privat maupun publik. Dengan kemampuan yang
                mencakup perencanaan, pembangunan, renovasi, serta pemeliharaan
                berbagai jenis bangunan, CV Pandan Sembilan melayani proyek
                seperti pembangunan gedung, perumahan, villa, rumah kos,
                fasilitas pendidikan, serta pekerjaan
                Mekanikal–Elektrikal–Plumbing (MEP), instalasi ACP (Aluminium
                Composite Panel), hingga pekerjaan jalan dan infrastruktur
                pendukung lainnya. Keberagaman layanan ini menunjukkan kesiapan
                perusahaan dalam memberikan solusi konstruksi menyeluruh sesuai
                kebutuhan klien. Berbekal tenaga profesional yang kompeten dan
                manajemen proyek yang terstruktur, CV Pandan Sembilan selalu
                memastikan setiap proyek berjalan tepat waktu, sesuai standar
                mutu, dan memenuhi regulasi keselamatan yang berlaku. Komitmen
                ini menjadi fondasi utama dalam membangun kepercayaan serta
                hubungan jangka panjang dengan klien dan mitra bisnis. Didukung
                visi untuk memperkuat kualitas pembangunan nasional, CV Pandan
                Sembilan terus melakukan pengembangan kapasitas, penerapan
                teknologi konstruksi modern, dan peningkatan kualitas sumber
                daya manusia. Dengan reputasi yang terus meningkat dan
                portofolio proyek yang berkembang, perusahaan ini siap membuka
                peluang kolaborasi dengan investor yang ingin berkontribusi
                dalam pembangunan berkelanjutan dan menghadirkan infrastruktur
                berkualitas di Indonesia.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3
                className={`${lato.className} mb-4 text-2xl font-bold text-gray-800`}
              >
                Dampak Kami
              </h3>
              <p
                className={`${lato.className} text-base leading-relaxed text-gray-600 sm:text-lg`}
              >
                Dengan banyaknya proyek yang berhasil di Palembang dan Sumatera
                Selatan, kami menghadirkan solusi konstruksi yang berdampak dan
                memenuhi standar tertinggi. Tim kami bekerja dengan dedikasi
                untuk melampaui ekspektasi klien dan menghadirkan hasil terbaik
                di setiap proyek. Kami terus meningkatkan kualitas melalui
                pengawasan mutu yang ketat, pemanfaatan teknologi terkini, serta
                komitmen terhadap keselamatan kerja dan keberlanjutan.
              </p>
            </div>
          </div>
          {/* Stats */}
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "40+", label: "Proyek Selesai" },
              { number: "30+", label: "Anggota Tim" },
              { number: "10+", label: "Tahun Pengalaman" },
              { number: "95%", label: "Kepuasan Klien" },
            ].map((stat, index) => (
              <div
                className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center transition-all duration-300 hover:border-blue-300"
                key={index}
              >
                <div
                  className={`${lato.className} mb-2 text-4xl font-bold text-blue-600 md:text-5xl`}
                >
                  {stat.number}
                </div>
                <div
                  className={`${lato.className} text-base font-medium text-gray-600 sm:text-lg`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          {/* Organization Structure */}
          <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl">
            <div className="mb-8 text-center">
              <h3
                className={`${lato.className} mb-3 text-3xl font-bold text-gray-800`}
              >
                Struktur Organisasi
              </h3>
              <p className={`${lato.className} text-gray-600`}>
                Gambaran ringkas peran dan alur koordinasi di CV Pandan
                Sembilan.
              </p>
            </div>

            <div className="relative mx-auto max-w-5xl">
              {/* Level 1: CEO & Founder */}
              <div className="mx-auto w-full max-w-xs rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <p
                  className={`${lato.className} text-sm tracking-wider text-blue-600 uppercase`}
                >
                  Pimpinan
                </p>
                <h4
                  className={`${lato.className} mt-1 text-xl font-bold text-gray-800`}
                >
                  CEO & Founder
                </h4>
              </div>

              {/* Connector to level 2 */}
              <div className="mx-auto my-4 h-8 w-0.5 bg-blue-300" />
              <div className="relative mx-auto mb-6 h-px w-full max-w-3xl bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />

              {/* Level 2: Managers */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <p
                    className={`${lato.className} text-sm tracking-wider text-blue-600 uppercase`}
                  >
                    Manajemen
                  </p>
                  <h4
                    className={`${lato.className} mt-1 text-lg font-bold text-gray-800`}
                  >
                    Manager HRD
                  </h4>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <p
                    className={`${lato.className} text-sm tracking-wider text-blue-600 uppercase`}
                  >
                    Operasional
                  </p>
                  <h4
                    className={`${lato.className} mt-1 text-lg font-bold text-gray-800`}
                  >
                    Manager Project
                  </h4>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <p
                    className={`${lato.className} text-sm tracking-wider text-blue-600 uppercase`}
                  >
                    Keselamatan
                  </p>
                  <h4
                    className={`${lato.className} mt-1 text-lg font-bold text-gray-800`}
                  >
                    Manager HSE
                  </h4>
                </div>
              </div>

              {/* Connector down from Manager Project */}
              <div className="mx-auto my-4 flex w-full items-center justify-center">
                <div className="h-8 w-0.5 bg-blue-300" />
              </div>

              {/* Level 3: Under Manager Project */}
              <div className="mx-auto grid max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <p
                    className={`${lato.className} text-sm tracking-wider text-blue-600 uppercase`}
                  >
                    Tim Teknis
                  </p>
                  <h4
                    className={`${lato.className} mt-1 text-lg font-bold text-gray-800`}
                  >
                    Desain
                  </h4>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-indigo-50 to-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                    <FileCheck className="h-6 w-6 text-white" />
                  </div>
                  <p
                    className={`${lato.className} text-sm tracking-wider text-blue-600 uppercase`}
                  >
                    Tim Teknis
                  </p>
                  <h4
                    className={`${lato.className} mt-1 text-lg font-bold text-gray-800`}
                  >
                    MEP
                  </h4>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-6 text-center shadow-sm">
                <p
                  className={`${lato.className} mb-4 text-base text-gray-700 sm:text-lg`}
                >
                  Tertarik dengan struktur tim kami dan ingin berdiskusi proyek?
                </p>
                <Link
                  className={`${lato.className} inline-block rounded-full border border-blue-500 bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700`}
                  href="/contact"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative bg-gray-50 px-6 py-20 pt-40" id="vision">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2
              className={`${lato.className} mb-4 text-4xl font-bold text-gray-800 md:text-5xl`}
            >
              Visi & Misi
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-blue-600" />
          </div>

          <div className="mb-12 flex flex-col gap-8">
            <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600">
                <Eye className="h-9 w-9 text-white" />
              </div>
              <h3
                className={`${lato.className} mb-6 text-3xl font-bold text-gray-800`}
              >
                Visi
              </h3>
              <p
                className={`${lato.className} text-justify text-base leading-relaxed text-gray-600 sm:text-lg`}
              >
                Menjadi Perusahaan Konstruksi terbaik di Indonesia yang
                menekankan pada Perkembangan Kepuasan konsumen & kesejahteraan
                para pemangku kepentingan melalui tata kelola Perusahaan yang
                Efektif, Efesiensi & Profesional dibidang Konstruksi serta
                tanggung jawab menjaga kualitas kinerja.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600">
                <Target className="h-9 w-9 text-white" />
              </div>
              <h3
                className={`${lato.className} mb-6 text-3xl font-bold text-gray-800`}
              >
                Misi
              </h3>
              <ol
                className={`${lato.className} list-decimal pl-6 text-justify text-base leading-relaxed text-gray-600 sm:text-lg`}
              >
                <li>
                  Menyeragamkan pandangan antar pihak manajemen dengan karyawan
                  dalam mempertahankan nilai perusahaan guna mencapai tujuan
                  bersama.
                </li>
                <li>
                  Memaksimalkan aspek manajemen operasional, pemasaran, resiko,
                  sumber daya manusia, keuangan, teknologi, informasi yang
                  efektif & efesiensi.
                </li>
                <li>
                  Menjalin kerjasama dengan berbagai pihak dibidang kontruksi
                  berskala nasional maupun internasional guna meningkatkan
                  kompetisi, sekaligus membuka lapangan pekerjaan.
                </li>
              </ol>
            </div>
          </div>

          {/* Core Values */}
          <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-md">
            <h3
              className={`${lato.className} mb-8 text-center text-3xl font-bold text-gray-800`}
            >
              Nilai Inti Kami
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "Kualitas",
                  desc: "Menghadirkan keunggulan dalam setiap proyek",
                },
                {
                  title: "Integritas",
                  desc: "Bekerja dengan kejujuran dan transparansi",
                },
                {
                  title: "Profesionalisme",
                  desc: "Menjaga standar tertinggi di industri konstruksi",
                },
              ].map((value, index) => (
                <div
                  className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center transition-all duration-300 hover:border-blue-300"
                  key={index}
                >
                  <h4
                    className={`${lato.className} mb-3 text-xl font-semibold text-blue-600`}
                  >
                    {value.title}
                  </h4>
                  <p
                    className={`${lato.className} text-base text-gray-600 sm:text-lg`}
                  >
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legality Section */}
      <section className="relative px-6 py-20 pt-40" id="certifications">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2
              className={`${lato.className} mb-4 text-4xl font-bold text-gray-800 md:text-5xl`}
            >
              Informasi Legal
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-blue-600" />
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <FileCheck className={`${lato.className} h-7 w-7 text-white`} />
              </div>
              <h3
                className={`${lato.className} mb-4 text-2xl font-bold text-gray-800`}
              >
                Registrasi Perusahaan
              </h3>
              <div
                className={`${lato.className} space-y-3 text-base text-gray-600 sm:text-lg`}
              >
                <p>
                  <span
                    className={`${lato.className} font-semibold text-blue-600`}
                  >
                    Nama Perusahaan Legal:
                  </span>{" "}
                  CV PANDAN SEMBILAN
                </p>
                <p>
                  <span
                    className={`${lato.className} font-semibold text-blue-600`}
                  >
                    Nomor Registrasi:
                  </span>{" "}
                  Tersembunyi
                </p>
                <p>
                  <span
                    className={`${lato.className} font-semibold text-blue-600`}
                  >
                    Tanggal Pendirian:
                  </span>{" "}
                  15 Desember 2021
                </p>
                <p>
                  <span
                    className={`${lato.className} font-semibold text-blue-600`}
                  >
                    Lokasi:
                  </span>{" "}
                  Palembang, Sumatera Selatan, Indonesia
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <Shield className={`${lato.className} h-7 w-7 text-white`} />
              </div>
              <h3
                className={`${lato.className} mb-4 text-2xl font-bold text-gray-800`}
              >
                Sertifikasi & Kepatuhan
              </h3>
              <div
                className={`${lato.className} space-y-3 text-base text-gray-600 sm:text-lg`}
              >
                <p>
                  <span
                    className={`${lato.className} font-semibold text-blue-600`}
                  >
                    Izin Usaha:
                  </span>{" "}
                  Aktif & Valid
                </p>
                <p>
                  <span
                    className={`${lato.className} font-semibold text-blue-600`}
                  >
                    Izin Konstruksi:
                  </span>{" "}
                  Bersertifikat
                </p>
                <p>
                  <span
                    className={`${lato.className} font-semibold text-blue-600`}
                  >
                    Standar Keselamatan:
                  </span>{" "}
                  Mematuhi
                </p>
                <p>
                  <span
                    className={`${lato.className} font-semibold text-blue-600`}
                  >
                    Kepatuhan Lingkungan:
                  </span>{" "}
                  Bersertifikat
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-lg border border-gray-200 bg-white p-8 shadow-md">
            <h3
              className={`${lato.className} mb-6 text-center text-2xl font-bold text-gray-800`}
            >
              Sertifikasi
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className={`${lato.className} px-4 py-3 text-left text-sm font-semibold text-gray-700`}
                    >
                      Judul
                    </th>
                    <th
                      className={`${lato.className} px-4 py-3 text-left text-sm font-semibold text-gray-700`}
                    >
                      Deskripsi
                    </th>
                    <th
                      className={`${lato.className} px-4 py-3 text-left text-sm font-semibold text-gray-700`}
                    >
                      Tahun
                    </th>
                    <th
                      className={`${lato.className} px-4 py-3 text-left text-sm font-semibold text-gray-700`}
                    >
                      Status
                    </th>
                    <th
                      className={`${lato.className} px-4 py-3 text-left text-sm font-semibold text-gray-700`}
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {certifications.map((c) => {
                    const isValid =
                      typeof c.status === "boolean"
                        ? c.status
                        : String(c.status).toLowerCase() === "true" ||
                          String(c.status).toLowerCase() === "valid";

                    return (
                      <tr
                        className="hover:bg-gray-50"
                        key={c._id || `${c.title}-${c.year}`}
                      >
                        <td
                          className={`${lato.className} px-4 py-3 text-sm text-gray-800`}
                        >
                          {c.title || "-"}
                        </td>
                        <td
                          className={`${lato.className} px-4 py-3 text-sm text-gray-600`}
                        >
                          {c.description || "-"}
                        </td>
                        <td
                          className={`${lato.className} px-4 py-3 text-sm text-gray-600`}
                        >
                          {c.year || "-"}
                        </td>
                        <td
                          className={`${lato.className} px-4 py-3 text-sm ${isValid ? "text-green-600" : "text-red-600"}`}
                        >
                          {isValid ? "Valid" : "Tidak Valid"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            className={`${lato.className} rounded bg-blue-600 px-3 py-2 text-sm text-white transition-all duration-300 hover:bg-blue-700`}
                            onClick={() =>
                              c._id && getCertificationsById(c._id)
                            }
                          >
                            Lihat
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {certifications.length === 0 && (
                    <tr>
                      <td
                        className={`${lato.className} px-4 py-6 text-center text-sm text-gray-500`}
                        colSpan={5}
                      >
                        Tidak ada data sertifikat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {selectedCert && (
              <div
                aria-label="Dialog sertifikat"
                aria-modal="true"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                role="dialog"
              >
                <div
                  className="max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-4"
                  role="document"
                >
                  <h4
                    className={`${lato.className} mb-3 text-lg font-bold text-gray-800`}
                  >
                    {selectedCert.title}
                  </h4>
                  {selectedCert.file ? (
                    <div className="relative inline-block">
                      <img
                        alt={selectedCert.title || "Certificate"}
                        className="block h-auto w-auto"
                        src={selectedCert.file}
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 select-none">
                        <span
                          className={`${lato.className} text-center text-3xl font-extrabold tracking-widest text-white/10 uppercase sm:text-5xl md:text-6xl lg:text-7xl`}
                        >
                          CV PANDAN SEMBILAN
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className={`${lato.className} text-sm text-gray-600`}>
                      Gambar sertifikat tidak tersedia.
                    </p>
                  )}
                  <div className="mt-4 text-right">
                    <button
                      className={`${lato.className} rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700`}
                      onClick={() => setSelectedCert(null)}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="dark:bg-darkmode bg-gray-50 py-20 pt-40 md:py-24">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <div className="space-y-12">
            <div className="text-center">
              <p
                className={`${lato.className} text-sm tracking-[0.3em] text-blue-500 uppercase`}
              >
                Hubungi Kami
              </p>
              <h2
                className={`${lato.className} text-secondary mt-3 text-[32px] leading-[2.5rem] font-bold sm:text-[46px] sm:leading-[3.7rem] dark:text-white`}
              >
                Alamat Perusahaan
              </h2>
            </div>

            <div className="border-opacity-50 dark:border-dark_border grid grid-cols-1 gap-0 border-b border-solid border-white pb-11 md:grid-cols-6 lg:grid-cols-9 xl:gap-30">
              <div className="col-span-3">
                <h3
                  className={`${lato.className} text-secondary max-w-219 text-[28px] leading-[2.25rem] font-bold sm:text-[40px] sm:leading-[3.4rem] dark:text-white`}
                >
                  <Image
                    alt="CV Pandan Sembilan Logo"
                    height={200}
                    src="/images/general/logotext.svg"
                    width={700}
                  />
                </h3>
              </div>
              <div className="col-span-3">
                <p
                  className={`${lato.className} text-secondary dark:text-darktext max-w-266 text-xl leading-10 font-normal sm:text-2xl`}
                >
                  JALAN SEI SELAN NOMOR 137, Desa/Kelurahan Siringagung, Kec.
                  Ilir Barat Satu,
                  <br /> Palembang, Sumatera Selatan
                  <br /> Indonesia 30138
                </p>
              </div>
              <div className="col-span-3">
                <Link
                  className={`${lato.className} text-secondary dark:text-SereneSky hover:text-RegalBlue text-xl font-medium underline sm:text-2xl hover:dark:text-white`}
                  href="/contact"
                >
                  cv.pandansembilan10@gmail.com
                </Link>
                <Link
                  className={`${lato.className} text-secondary dark:text-primary hover:text-opacity-100 flex w-fit items-center gap-2 text-xl sm:text-2xl hover:dark:text-white`}
                  href="tel:+62"
                >
                  <span className={`${lato.className} text-primary`}>Call</span>
                  +62 85102498419
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
