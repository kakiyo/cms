import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/system";
import "dayjs/locale/ja";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import { ApiErrorPopup } from "@/components/common/ApiError";
import Layout from "@/layouts/Layout";
import { rootTheme } from "@/layouts/rootTheme";
import { DateProvider } from "@/provider/DateProvider";
import { LoginGuardProvider } from "@/provider/LoginGuardProvider";
import { QueryClientProvider } from "@/provider/QueryClientProvider";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const withoutLayouts = ["/login", "/roleNotice"];

  return (
    <>
      <Head>
        <title>SYSTEM-CMS</title>
        <meta name="description" content="SYSTEM Contents Manage System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DateProvider>
        <ThemeProvider theme={rootTheme}>
          <RecoilRoot>
            <QueryClientProvider>
              <CssBaseline />
              <LoginGuardProvider>
                <ApiErrorPopup />
                {router.route !== "/" &&
                withoutLayouts.some((path) => router.route.startsWith(path)) ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </LoginGuardProvider>
            </QueryClientProvider>
          </RecoilRoot>
        </ThemeProvider>
      </DateProvider>
    </>
  );
}
