import Carousel from "@/components/Carousel/Carousel";
import { Button } from "@heroui/button";

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

const portfolio = new Array(6).fill(0).map((_, i) => ({
  img: `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60&ixid=${i}`,
}));

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      {/* Carousel / Hero */}
      <div className="w-full">
        <Carousel />
      </div>

      {/* About Us */}
      <section className="w-full">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <div className="w-full rounded-md bg-white p-0">
            <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl">
                  About Us
                </h3>
                <p className="text-justify text-base leading-relaxed text-gray-700 sm:text-lg md:text-left md:text-xl lg:text-2xl">
                  CV Pandan Sembilan merupakan Perusahaan konstruksi Swasta
                  berskala Nasional yang berdiri pada Desember 2021 oleh Founder
                  CV Pandan Sembilan, Heru Noviyanto. CV Pandan Sembilan
                  menyediakan jasa perencanaan pembangunan, renovasi dan
                  pemeliharaan gedung, perumahan, vila, kost, sekolah, mekanikal
                  elektrikal plumbing, ACP (Aluminium Composite Panel), jalan
                  raya, dan lain-lain.
                </p>
                <p className="mt-4 text-justify text-base leading-relaxed text-gray-700 sm:text-lg md:text-left md:text-xl lg:text-2xl">
                  Pada dasarnya CV Pandan Sembilan dibangun untuk memenuhi
                  kebutuhan konsumen serta meningkatkan struktur pembangunan
                  yang kian meningkat, serta menjaga keselamatan masyarakat di
                  lokasi pembangunan proyek dan sekitarnya.
                </p>
              </div>

              <div className="flex items-stretch justify-end">
                <div className="h-full w-full max-w-full overflow-hidden rounded-3xl shadow-lg sm:max-w-[420px] md:max-w-[640px] lg:max-w-[820px] xl:max-w-[980px] 2xl:max-w-[1100px]">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1400&q=60')`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Best Services */}
      <section className="w-full">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <h3 className="mb-8 text-center text-5xl font-semibold">
            Our Best Services
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="relative overflow-hidden rounded-xl bg-white shadow-md"
              >
                <div
                  className="h-48 bg-cover bg-center sm:h-60 md:h-72 lg:h-80 xl:h-96 2xl:h-[28rem]"
                  style={{ backgroundImage: `url('${s.img}')` }}
                />
                <div className="absolute right-0 bottom-0 left-0">
                  <div className="rounded-b-xl bg-red-600 py-3 text-center text-sm font-semibold text-white sm:py-4 sm:text-base md:text-lg">
                    {s.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Portfolio */}
      <section className="w-full">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <h3 className="mb-6 text-center text-5xl font-semibold">
            Our Portofolio
          </h3>
          <div className="mb-6 flex items-center justify-center gap-3">
            <button className="rounded-full bg-blue-500 px-4 py-1 text-sm text-white">
              All
            </button>
            <button className="rounded-full border bg-white px-4 py-1 text-sm text-blue-600">
              Project 1
            </button>
            <button className="rounded-full border bg-white px-4 py-1 text-sm text-blue-600">
              Project 2
            </button>
            <button className="rounded-full border bg-white px-4 py-1 text-sm text-blue-600">
              Project 3
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {portfolio.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-xl shadow-md">
                <div
                  className="h-40 bg-cover bg-center sm:h-48 md:h-56 lg:h-64 xl:h-72 2xl:h-[22rem]"
                  style={{ backgroundImage: `url('${p.img}')` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Info box */}
      <section className="w-full">
        <div className="mx-auto max-w-full px-4 py-14 sm:px-6 md:px-8 lg:max-w-[1100px] xl:max-w-[1320px] 2xl:max-w-[1536px]">
          <div className="flex items-center justify-between gap-6 rounded-xl bg-blue-600 p-6 text-white sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16">
            <div className="flex flex-1 items-center text-justify text-base sm:text-lg md:text-left md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl">
              CV Pandan Sembilan Menyediakan jasa perencanaan pembangunan,
              renovasi dan pemeliharaan gedung, perumahan, vila, kost, sekolah,
              mekanikal elektrikal plumbing, ACP (Aluminium Composite Panel),
              jalan raya, dan lain-lain.
            </div>
            <div className="flex-shrink-0 self-center">
              <Button className="flex rounded-full bg-white px-6 py-12 font-semibold text-blue-600 shadow-lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
