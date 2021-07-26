import Head from "next/head";
import { Base64Demo } from "../components/Base64Demo";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jina Showcases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="demo-container">
          <Base64Demo />
        </div>
        <style jsx>
          {`
            .demo-container {
              margin: 4em;
            }
          `}
        </style>
      </main>
    </div>
  );
}
