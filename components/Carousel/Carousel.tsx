import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

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
    title: "Excellent Engineering",
    subtitle: "Struktur kokoh, desain modern, hasil memuaskan",
    image:
      "https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=1600&q=60",
    overlay: "bg-gradient-to-r from-black/50 via-black/30 to-transparent",
  },
  {
    title: "Build Confidence",
    subtitle: "Solusi konstruksi lengkap dan profesional",
    image: "/images/general/construction.jpg",
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
    <div className="relative w-full" id="hero-carousel">
      <div className="relative min-h-[110vh] overflow-hidden">
        {slides.map((s, i) => (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
            key={i}
          >
            {/* Background image */}
            <Image
              alt={s.title}
              className="object-cover"
              fill
              priority={i === 0}
              sizes="100vw"
              src={s.image}
            />
            {/* Overlay gradient for legibility */}
            {s.overlay && <div className={`absolute inset-0 ${s.overlay}`} />}
            {/* Dark layer for consistent contrast */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Edge arrows (all breakpoints) */}
            <button
              aria-label="Previous slide"
              className="absolute top-0 left-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-r from-black/25 via-black/10 to-black/0 text-white transition hover:from-black/35 hover:via-black/15 sm:w-14 lg:w-16"
              onClick={goPrev}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              aria-label="Next slide"
              className="absolute top-0 right-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-l from-black/25 via-black/10 to-black/0 text-white transition hover:from-black/35 hover:via-black/15 sm:w-14 lg:w-16"
              onClick={goNext}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Centered content with edge arrows and text shadow */}
            <div className="relative z-10 w-full px-4">
              <div className="mx-auto max-w-[1450px]">
                <div className="relative mx-auto max-w-3xl text-white sm:p-20 sm:text-left md:p-20">
                  {/* Text block with per-letter shadow (no box) */}
                  <div className={`${lato.className} text-center sm:text-left`}>
                    <h2
                      className={`${lato.className} text-xl font-bold drop-shadow-[0_3px_8px_rgba(0,0,0,0.55)] max-sm:leading-snug sm:text-3xl md:text-5xl lg:text-6xl`}
                    >
                      {s.title}
                    </h2>
                    {s.subtitle && (
                      <p
                        className={`${lato.className} mt-2 ml-1 text-xs font-medium opacity-95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] max-sm:leading-relaxed sm:mt-2 sm:text-base md:text-lg lg:text-xl`}
                      >
                        {s.subtitle}
                      </p>
                    )}
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
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
              key={i}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
