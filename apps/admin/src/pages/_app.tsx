// i18n
import "../locales/i18n";

// scroll bar
import "simplebar-react/dist/simplebar.min.css";

// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from "@emotion/react";
// next
import { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
// utils
import createEmotionCache from "@utils/createEmotionCache";

// components
import ProgressBar from "@components/progress-bar";
import SnackbarProvider from "@components/snackbar";
import { MotionLazyContainer } from "@components/animate";
import { ThemeSettings, SettingsProvider } from "@components/settings";

// theme
import ThemeProvider from "../theme";
// locales
import ThemeLocalization from "../locales";

// Check our docs
// https://docs.minimals.cc/authentication/ts-version

import { AuthProvider } from "../auth/JwtContext";
import { Web3ReactProvider, Web3ReactHooks } from "@web3-react/core";
import { metaMask, hooks as metaMaskHooks } from "../components/web3/connectors/metaMask";
import { network, hooks as networkHooks } from "../components/web3/connectors/network";
import type { MetaMask } from "@web3-react/metamask";
import type { Network } from "@web3-react/network";
import QueryProvider from "src/libs/get-query-client";

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
];

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Web3ReactProvider connectors={connectors}>
          <AuthProvider>
            <SettingsProvider>
              <MotionLazyContainer>
                <ThemeProvider>
                  <ThemeSettings>
                    <ThemeLocalization>
                      <SnackbarProvider>
                        <ProgressBar />
                        {getLayout(<Component {...pageProps} />)}
                      </SnackbarProvider>
                    </ThemeLocalization>
                  </ThemeSettings>
                </ThemeProvider>
              </MotionLazyContainer>
            </SettingsProvider>
          </AuthProvider>
        </Web3ReactProvider>
      </CacheProvider>
    </QueryProvider>
  );
}
