import {useState} from 'react'
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ShowcaseLayout } from "../layouts/ShowcaseLayout";

function App({ Component, pageProps }: AppProps) {
  const [showFlowChart, setShowFlowChart] = useState(false)
  return (
    <ShowcaseLayout showFlowChart={showFlowChart} setShowFlowChart={setShowFlowChart}>
      <Component {...pageProps} setShowFlowChart={setShowFlowChart} showFlowChart={showFlowChart} />
    </ShowcaseLayout>
  );
}
export default App;
