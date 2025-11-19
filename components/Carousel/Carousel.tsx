import React, { useEffect, useRef, useState } from "react";

interface Slide {
  title: string;
  subtitle?: string;
  image?: string;
  bgClass?: string;
}

const slides: Slide[] = [
  {
    title: "Welcome to Our Site",
    subtitle: "Quality services, tailored for you",
    bgClass: "bg-gradient-to-r from-blue-600 to-teal-400",
  },
  {
    title: "Our Services",
    subtitle: "We build modern, responsive apps",
    bgClass: "bg-gradient-to-r from-purple-600 to-pink-500",
  },
  {
    title: "Get In Touch",
    subtitle: "Let's make something great together",
    bgClass: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
];

export default function Carousel(
  { autoPlay = true, interval = 5000 } = { autoPlay: true, interval: 5000 },
) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoPlay, interval]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative h-64 sm:h-80 md:h-96">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex transform items-center justify-center px-6 text-center transition-transform duration-500 ease-in-out ${
                i === index
                  ? "z-10 translate-x-0"
                  : i < index
                    ? "z-0 -translate-x-full"
                    : "z-0 translate-x-full"
              }`}
            >
              <div
                className={`${s.bgClass} flex h-full w-full items-center justify-center text-white`}
              >
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold drop-shadow-md sm:text-3xl md:text-4xl">
                    {s.title}
                  </h2>
                  {s.subtitle && (
                    <p className="mt-3 text-sm opacity-95 sm:text-base md:text-lg">
                      {s.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* controls */}
        <button
          aria-label="Previous"
          onClick={goPrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l3.879 3.879a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          aria-label="Next"
          onClick={goNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.707 4.293a1 1 0 010 1.414L3.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
              clipRule="evenodd"
              transform="translate(8 0) scale(-1 1)"
            />
          </svg>
        </button>

        {/* indicators */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${i === index ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
