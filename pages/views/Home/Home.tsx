import Carousel from "@/components/Carousel/Carousel";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      <div className="w-full">
        <Carousel />
      </div>

      <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
        <h1 className="mb-4 text-3xl font-bold">Home Page</h1>
        <p>
          This is the home page content. Below the carousel you can place
          highlights, features or calls to action.
        </p>
      </div>

      <section>
        <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
          <h2 className="mb-4 text-2xl font-semibold">Features</h2>
          <p>Describe your key features here.</p>
        </div>
      </section>
    </section>
  );
};

export default Home;
