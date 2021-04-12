import { useRef } from "react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ReactQueryDevtools } from "react-query/devtools"
import RealmAppProvider from "components/providers/RealmAppProvider"

import "antd/dist/antd.css"
import "styles/global.css"

export const APP_ID = "application-0-ukbka"

// https://react-query.tanstack.com/examples/nextjs
function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef: any = useRef()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <RealmAppProvider appId={APP_ID}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </RealmAppProvider>
    </QueryClientProvider>
  )
}

export default MyApp
