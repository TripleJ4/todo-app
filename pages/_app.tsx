import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"

import "antd/dist/antd.css"
import "styles/global.css"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
