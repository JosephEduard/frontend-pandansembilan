import type { AppProps } from "next/app";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import "@/styles/globals.css";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { onErrorHandler } from "@/libs/axios/responseHandler";
import AppShell from "@/components/commons/AppShell";
import { ToasterProvider } from "@/contexts/ToasterContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onErrorHandler(error);

        return false;
      },
    },
    mutations: {
      onError: onErrorHandler,
    },
  },
});

function SessionWatcher() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");

  // If unauthenticated while on admin, redirect to admin login only
  useEffect(() => {
    if (isAdminRoute && status === "unauthenticated") {
      router.replace("/auth/admin/login");
    }
  }, [status, isAdminRoute, router]);

  // Schedule logout only for admin routes; on public pages just clear session without redirect
  useEffect(() => {
    if (!isAdminRoute) return;

    const expires = sessionData?.expires;

    if (!expires) return;

    const expiryTime = new Date(expires).getTime();
    const now = Date.now();
    const timeout = Math.max(expiryTime - now, 0);

    const timer = setTimeout(async () => {
      await signOut({ redirect: false });
      router.replace("/auth/admin/login");
    }, timeout);

    return () => clearTimeout(timer);
  }, [sessionData?.expires, isAdminRoute, router]);

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
