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
import { useRef } from "react";

function useJina(url?: BaseURL) {
  const [jina, setJina] = useState<JinaClient>();
  const [queries, setQueries] = useState<SimpleQueries>([]);
  const [results, setResults] = useState<SimpleResults[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (url) setJina(new JinaClient(url));
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
  const [url, setURL] = useState<BaseURL | undefined>(undefined);
  const { results, searching, search, queries } = useJina(url);
  const urlInputRef = useRef<HTMLInputElement>(null);
  
  const initClient = () => {
    const inputURL = urlInputRef.current?.value;
    if (inputURL) setURL(inputURL as BaseURL);
  };

  return (
    <div>
      <Head>
        <title>Jina Showcases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {url ? (
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
        ) : (
          <div className="flex flex-row items-center">
            <input
              className="border px-4 py-2 rounded"
              ref={urlInputRef}
              placeholder="endpoint URL"
            />
            <button
              className="rounded p-2 bg-green-500 px-6 text-white ml-3"
              onClick={initClient}
            >
              Set
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
