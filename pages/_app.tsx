import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}
