import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ShowcaseLayout } from "../layouts/ShowcaseLayout";

function App({ Component, pageProps }: AppProps) {
  return (
    <ShowcaseLayout>
      <Component {...pageProps} />
    </ShowcaseLayout>
  );
}
export default App;
