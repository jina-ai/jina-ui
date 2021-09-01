import Head from "next/head";
import { SearchBar } from "../components/SearchBar";
import JinaClient, {
  BaseURL,
  RawDocumentData,
  SimpleResults,
  SimpleQueries,
} from "@jina-ai/jinajs";
import { Results } from "../components/Results";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";

function useJina(url: BaseURL) {
  const [jina, setJina] = useState<JinaClient>();
  const [queries, setQueries] = useState<SimpleQueries>([]);
  const [results, setResults] = useState<SimpleResults[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setJina(new JinaClient(url));
  }, [url]);

  async function search(...documents: RawDocumentData[]) {
    if (!jina) return;
    setSearching(true);
    const { results, queries } = await jina.search(...documents);
    setSearching(false);
    setResults(results);
    setQueries(queries);
  }

  return {
    results,
    queries,
    searching,
    search,
  };
}

const EmptyMessage = () => (
  <div className="text-center text-3xl text-gray-500 py-36">
    Search for something
  </div>
);

const Searching = () => (
  <div className="mx-auto text-3xl py-36 flex flex-row items-center text-primary-500">
    <Spinner />
    <span className="animate-pulse">Searching...</span>
  </div>
);

export default function Home() {
  const { results, searching, search, queries } = useJina(
    "http://localhost:45678"
  );

  console.log("results:", results);
  console.log("queries:", queries);

  return (
    <div>
      <Head>
        <title>Jina Showcases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="demo-container grid col-span-1 space-y-4">
          <SearchBar search={search} searching={searching} />
          {searching ? (
            <Searching />
          ) : results.length ? (
            <Results queries={queries} results={results} />
          ) : (
            <EmptyMessage />
          )}
        </div>
      </main>
    </div>
  );
}
