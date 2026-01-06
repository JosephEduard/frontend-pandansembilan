import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import "@/styles/globals.css";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { onErrorHander } from "@/libs/axios/responseHandler";
import AppShell from "@/components/commons/AppShell";
import { ToasterProvider } from "@/contexts/ToasterContext";
import { useEffect } from "react";

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

function SessionWatcher() {
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData?.expires) {
      const expiryTime = new Date(sessionData.expires).getTime();
      const now = Date.now();
      const timeout = expiryTime - now;

      if (timeout > 0) {
        const timer = setTimeout(() => {
          signOut({ callbackUrl: "/auth/login" });
        }, timeout);

        return () => clearTimeout(timer);
      } else {
        signOut({ callbackUrl: "/auth/login" });
      }
    }
  }, [sessionData]);

  return null; // tidak render apa-apa
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToasterProvider>
            <AppShell>
              <SessionWatcher />
              <Component {...pageProps} />
            </AppShell>
          </ToasterProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
