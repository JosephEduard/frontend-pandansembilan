import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Slide {
  title: string;
  subtitle?: string;
  image: string;
  overlay?: string; // optional overlay gradient
}

// Option A: Full-bleed image carousel with overlayed text & existing controls/indicators.
const slides: Slide[] = [
  {
    title: "Transforming Spaces",
    subtitle: "Kualitas & Integritas dalam setiap proyek",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=60",
    overlay: "bg-gradient-to-r from-black/60 via-black/40 to-transparent",
  },
  {
    title: "Engineering Excellence",
    subtitle: "Struktur kokoh, desain modern, hasil memuaskan",
    image:
      "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=1600&q=60",
    overlay: "bg-gradient-to-r from-black/50 via-black/30 to-transparent",
  },
  {
    title: "Build With Confidence",
    subtitle: "Solusi konstruksi lengkap dan profesional",
    image:
      "https://images.unsplash.com/photo-1493863641987-4b4e4891fb89?auto=format&fit=crop&w=1600&q=60",
    overlay: "bg-gradient-to-r from-black/55 via-black/35 to-transparent",
  },
];

export default function Carousel(
  { autoPlay = true, interval = 6000 } = { autoPlay: true, interval: 6000 },
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
    <div id="hero-carousel" className="relative w-full">
      <div className="relative min-h-[100vh] overflow-hidden max-sm:min-h-[115vh] sm:min-h-[108vh] md:min-h-[100vh] lg:min-h-screen">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            {/* Background image */}
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Overlay gradient for legibility */}
            {s.overlay && <div className={`absolute inset-0 ${s.overlay}`} />}
            {/* Dark layer for consistent contrast */}
            <div className="absolute inset-0 bg-black/30" />
            {/* Centered content (reuse aligned width) */}
            <div className="relative z-10 w-full px-4">
              <div className="mx-auto max-w-[1450px]">
                <div className="max-w-3xl text-white">
                  <h2 className="text-2xl font-bold drop-shadow-md sm:text-3xl md:text-5xl lg:text-6xl">
                    {s.title}
                  </h2>
                  {s.subtitle && (
                    <p className="mt-4 text-sm font-medium opacity-95 sm:text-base md:text-lg lg:text-xl">
                      {s.subtitle}
                    </p>
                  )}
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={goPrev}
                      className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-gray-800 shadow-lg backdrop-blur-sm transition hover:bg-white"
                    >
                      Prev
                    </button>
                    <button
                      onClick={goNext}
                      className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Side arrow controls removed (using internal Prev/Next buttons) */}
        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
