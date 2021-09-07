import React, { ReactNode, useState } from "react";
import { SimpleQueries, SimpleResults } from "@jina-ai/jinajs";
import { ResultItem } from "./ResultItem";
import { QuerySelector } from "./Queries";
import { ViewGridIcon, ViewListIcon } from "@heroicons/react/outline";

const DEFAULT_VIEW = "list";
type ViewType = "list" | "grid";

export type ResultsProps = {
  results: SimpleResults[];
  queries?: SimpleQueries;
  view?: ViewType;
};



export const ResultsView = ({ results, view }: { results: SimpleResults, view: ViewType }) => {

    const ResultsList = ({ results }: { results: SimpleResults }) => {
        return (
            <div className="grid grid-cols-1 gap-4">
                {results.map((result, idx) => (
                    <ResultItem result={result} key={idx} />
                ))}
            </div>
        );
    };

    const ResultsGrid = ({ results }: { results: SimpleResults }) => {
        return (
            <div className="grid grid-cols-4 gap-4">
                {results.map((result, idx) => (
                    <ResultItem result={result} key={idx} />
                ))}
            </div>
        );
    };

    switch (view) {
        case "list":
            return <ResultsList results={results}/>
        case "grid":
            return (
                <div className="grid grid-cols-4 gap-4">
                    {results.map((result, idx) => (
                        <ResultItem result={result} key={idx} />
                    ))}
                </div>
            )
    }
};


const ViewSelector = ({
  type,
  select,
  current,
}: {
  type: ViewType;
  current: ViewType;
  select: (view: ViewType) => void;
}) => {
  const selected = current === type;
  return (
    <div
      className={`cursor-pointer hover:bg-gray-100 rounded p-1 ml-2 transition-all duration-200 ${
        selected
          ? "bg-primary-500 hover:bg-primary-600 bg-opacity-50 hover:bg-opacity-50"
          : ""
      }`}
      onClick={() => select(type)}
    >
      {type === "list" ? (
        <ViewListIcon className="h-6" />
      ) : (
        <ViewGridIcon className="h-6" />
      )}
    </div>
  );
};

export const Results = ({
  results,
  view: preferredView,
  queries,
}: ResultsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [view, setView] = useState<ViewType>(preferredView || DEFAULT_VIEW);

  const hasResults = results.length > 0;
  const selectedResults = results[selectedIndex];

  return (
    <div className="relative max-w-full overflow-hidden">
      <QuerySelector
        queries={queries}
        selectedIndex={selectedIndex}
        select={setSelectedIndex}
      />
      <div className="mb-2 pt-3 font-semibold text-xl flex flex-row items-center">
        <div className="flex-1">Results</div>
        <ViewSelector current={view} type="list" select={setView} />
        <ViewSelector current={view} type="grid" select={setView} />
      </div>

      {hasResults ? (
          <ResultsView results={selectedResults} view={view}/>
      ) : (
        "Search for something"
      )}
    </div>
  );
};
