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
        <div className="mx-auto max-w-[1536px] px-0 py-14">
          <div className="w-full rounded-md bg-white p-0">
            <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-5xl font-semibold">About Us</h3>
                <p className="text-2xl leading-relaxed text-gray-700">
                  CV Pandan Sembilan merupakan Perusahaan konstruksi Swasta
                  berskala Nasional yang berdiri pada Desember 2021 oleh Founder
                  CV Pandan Sembilan, Heru Noviyanto. CV Pandan Sembilan
                  menyediakan jasa perencanaan pembangunan, renovasi dan
                  pemeliharaan gedung, perumahan, vila, kost, sekolah, mekanikal
                  elektrikal plumbing, ACP (Aluminium Composite Panel), jalan
                  raya, dan lain-lain.
                </p>
                <p className="mt-4 text-2xl leading-relaxed text-gray-700">
                  Pada dasarnya CV Pandan Sembilan dibangun untuk memenuhi
                  kebutuhan konsumen serta meningkatkan struktur pembangunan
                  yang kian meningkat, serta menjaga keselamatan masyarakat di
                  lokasi pembangunan proyek dan sekitarnya.
                </p>
              </div>

              <div className="flex items-stretch justify-end">
                <div className="h-full w-full max-w-[980px] overflow-hidden rounded-3xl shadow-lg">
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
        <div className="mx-auto max-w-[1536px] px-0 py-14">
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
                  className="h-80 bg-cover bg-center md:h-96"
                  style={{ backgroundImage: `url('${s.img}')` }}
                />
                <div className="absolute right-0 bottom-0 left-0">
                  <div className="rounded-b-xl bg-red-600 py-4 text-center text-base font-semibold text-white sm:text-base">
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
        <div className="mx-auto max-w-[1536px] px-0 py-14">
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
                  className="h-56 bg-cover bg-center sm:h-64"
                  style={{ backgroundImage: `url('${p.img}')` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Info box */}
      <section className="w-full">
        <div className="mx-auto max-w-[1536px] px-0 py-14">
          <div className="flex items-center justify-between gap-6 rounded-xl bg-blue-600 p-16 text-white">
            <div className="flex flex-1 items-center text-3xl">
              CV Pandan Sembilan Menyediakan jasa perencanaan pembangunan,
              renovasi dan pemeliharaan gedung, perumahan, vila, kost, sekolah,
              mekanikal elektrikal plumbing, ACP (Aluminium Composite Panel),
              jalan raya, dan lain-lain.
            </div>
            <div className="flex-shrink-0 self-center">
              <Button className="rounded-full bg-white px-8 py-12 font-semibold text-blue-600 shadow-lg">
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
