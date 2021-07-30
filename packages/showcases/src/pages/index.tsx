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
        <div className="demo-container grid col-span-1 space-y-4">
          <Base64Demo />
          <Base64Demo />
          <Base64Demo />
          <Base64Demo />
          <Base64Demo />
          <Base64Demo />
          <Base64Demo />
          <Base64Demo />
          <Base64Demo />
        </div>
      </main>
    </div>
  );
}
