import { useRef } from "react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ReactQueryDevtools } from "react-query/devtools"

import "antd/dist/antd.css"
import "styles/global.css"

// https://react-query.tanstack.com/examples/nextjs
function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef: any = useRef()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
