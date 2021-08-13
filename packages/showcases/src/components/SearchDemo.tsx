import React, { useState } from "react";
import JinaClient, { BaseURL, SimpleResults } from "@jina-ai/jinajs";
import { Spinner } from "./Spinner";

export const SearchDemo = () => {
  const [url, setURL] = useState("");
  const [text, setText] = useState("");
  const [jina, setJina] = useState<JinaClient>();
  const [results, setResults] = useState<SimpleResults>([]);
  const [file, setFile] = useState<File>();
  const [searching, setSearching] = useState(false);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    setFile(file);
  };

  async function initClient() {
    setJina(new JinaClient(url as BaseURL));
  }

  async function search() {
    if (!jina) return;
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
      {jina ? (
        <div>
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
            <div className="text-green-500 ml-4">
              {searching && <Spinner />}
            </div>
          </div>
          <div className="my-4">Raw Results:</div>
          <div className="bg-gray-50 rounded p-4 break-words font-mono">
            {results.length
              ? JSON.stringify(results)
              : "results will display here"}
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <input
            className="border px-4 py-2 rounded"
            onChange={(e) => setURL(e.target.value)}
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
    </div>
  );
};
