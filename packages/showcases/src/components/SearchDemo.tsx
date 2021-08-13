import React, { useState } from "react";
import JinaClient, { SimpleResults } from "@jina-ai/jinajs";
import { Spinner } from "./Spinner";
const jina = new JinaClient("http://localhost:45678");

export const SearchDemo = () => {
  const [text, setText] = useState("");
  const [results, setResults] = useState<SimpleResults>([]);
  const [file, setFile] = useState<File>();
  const [searching, setSearching] = useState(false);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    setFile(file);
  };

  async function search() {
    setSearching(true);
    let query = file || text;
    const results = await jina.search(query);
    setSearching(false);
    setResults(results);
  }

  return (
    <div className="rounded shadow-lg p-4 bg-white">
      <div className="border-b text-2xl font-medium mb-4">
        Search Demo (single document query)
      </div>
      <div className="flex flex-row items-center">
        <input
          className="border px-4 py-2 rounded"
          onChange={(e) => setText(e.target.value)}
          placeholder="search..."
        />
        <div className="px-2">
          <input
            type="file"
            className="mt-4"
            id="attach-files-button"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </div>
        <button
          disabled={searching}
          className="rounded p-2 bg-green-500 px-6 text-white ml-3"
          onClick={search}
        >
          Search
        </button>
        <div className="text-green-500 ml-4">{searching && <Spinner />}</div>
      </div>
      <div className="my-4">Raw Results:</div>
      <div className="bg-gray-50 rounded p-4 break-words font-mono">
        {results.length ? JSON.stringify(results) : "results will display here"}
      </div>
    </div>
  );
};
