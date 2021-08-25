import Head from "next/head";
import { Base64Demo } from "../components/Base64Demo";
import { SearchBar } from "../components/SearchBar/SearchBar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jina Showcases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="demo-container grid col-span-1 space-y-4">
          <SearchBar/>
        </div>
      </main>
    </div>
  );
}
