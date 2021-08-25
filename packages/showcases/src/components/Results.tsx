import React, { ReactNode, useState } from "react";
import { SimpleResult, SimpleResults } from "@jina-ai/jinajs";

const ResultItem = ({ result }: { result: SimpleResult }) => {
  return <div className="bg-gray-50 rounded p-4 mb-4">{result.data}</div>;
};

const QueryItem = ({
  query,
  selected,
  onClick,
}: {
  query: SimpleResult;
  selected?: boolean;
  onClick?: () => void;
}) => {
  const { data, score, mimeType } = query;

  return (
    <div
      onClick={onClick}
      className={`h-full w-72 inline-block cursor-pointer border border-gray-200 rounded p-4 mr-2 transition-all duration-200 ${
        selected ? "border-primary-500" : ""
      }`}
    >
      <TextItem data={data} />
    </div>
  );
};

const TextItem = ({
  data,
}: {
  data: string;
  size?: "sm" | "md" | "lg";
  font?: "regular" | "mono";
}) => {
  return (
    <div>
      <span className="jina-text-item overflow-hidden overflow-ellipsis">
        {data}
      </span>
      <style jsx>
        {`
          .jina-text-item {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export type ResultsProps = {
  results: SimpleResults[];
  display: "list" | "grid";
  queries: SimpleResults;
};

export const ResultsList = ({ results }: { results: SimpleResults }) => {
  return (
    <div>
      {results.map((result, idx) => (
        <ResultItem result={result} key={idx} />
      ))}
    </div>
  );
};

export const ResultsGrid = ({ results }: { results: SimpleResults }) => {
  return (
    <div>
      {results.map((result, idx) => (
        <ResultItem result={result} key={idx} />
      ))}
    </div>
  );
};

export const QuerySelector = ({
  queries,
  selectedIndex,
  select,
}: {
  queries: SimpleResults;
  selectedIndex: number;
  select: (index: number) => void;
}) => {
  return (
    <div className="mb-4">
      <div className="mb-2 font-semibold text-xl">Queries</div>
      <div className="w-full overflow-auto whitespace-nowrap pb-2">
        {queries.map((query, idx) => (
          <QueryItem
            query={query}
            selected={idx === selectedIndex}
            key={idx}
            onClick={() => select(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export const Results = ({ results, display, queries }: ResultsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [view, setView] = useState("list");

  const selectedResults = results[selectedIndex];

  return (
    <div className="relative max-w-full overflow-hidden">
      <QuerySelector
        queries={queries}
        selectedIndex={selectedIndex}
        select={setSelectedIndex}
      />
      <div className="mb-2 font-semibold text-xl">Results</div>
      {selectedResults.map((result, idx) => (
        <ResultItem result={result} key={idx} />
      ))}
    </div>
  );
};
