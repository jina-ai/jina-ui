import Head from "next/head";
import { SearchDemo } from "../components/SearchDemo";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jina Showcases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="demo-container grid col-span-1 space-y-4">
          <SearchDemo />
        </div>
      </main>
    </div>
  );
}
