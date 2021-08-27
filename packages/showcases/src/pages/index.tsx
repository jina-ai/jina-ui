import Head from "next/head";
import { SearchBar } from "../components/SearchBar";
import JinaClient, {
  BaseURL,
  RawDocumentData,
  SimpleResults,
  SimpleQueries
} from "@jina-ai/jinajs";
import { Results } from "../components/Results";
import { useEffect, useState } from "react";

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

export default function Home() {
  const { results, search,queries } = useJina("http://localhost:45678");

  console.log("results:",results);
  console.log("queries:",queries)

  return (
    <div>
      <Head>
        <title>Jina Showcases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="demo-container grid col-span-1 space-y-4">
          <SearchBar search={search} />
          <Results
            queries={queries}
            results={results}
          />
        </div>
      </main>
    </div>
  );
}
