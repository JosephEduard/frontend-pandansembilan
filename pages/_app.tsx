import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import "@/styles/globals.css";
import { onErrorHander } from "@/libs/axios/responseHandler";
import { Lato } from "next/font/google";
import { cn } from "@/utils/cn";
import { SessionProvider } from "next-auth/react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onErrorHander(error);
        return false;
      },
    },
    mutations: {
      onError: onErrorHander,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <main className={cn(lato.className)}>
            <Component {...pageProps} />
          </main>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
