import "../styles/globals.css";
import type { AppProps } from "next/app";
import { HeaderAndSidebarLayout } from "../layouts/HeaderAndSidebarLayout";

function App({ Component, pageProps }: AppProps) {
  return (
    <HeaderAndSidebarLayout>
      <Component {...pageProps} />
    </HeaderAndSidebarLayout>
  );
}
export default App;
