import React, {ComponentType, ReactNode, useState} from "react";
import {SimpleQueries, SimpleResult, SimpleResults} from "@jina-ai/jinajs";
import {ResultItem} from "./ResultItem";
import {QuerySelector} from "./Queries";
import {ViewGridIcon, ViewListIcon} from "@heroicons/react/outline";

const DEFAULT_VIEW = "list";
type ViewType = "list" | "grid";

type CustomResultItemProps = {
    result: SimpleResult,
    key: number
}
export type ICustomResultItem = ComponentType<CustomResultItemProps>

export type ResultsProps = {
    results: SimpleResults[];
    queries?: SimpleQueries;
    view?: ViewType;
    CustomResultItem?: ICustomResultItem
};

export const ResultsView = ({
                                results,
                                view,
                                CustomResultItem
                            }: { results: SimpleResults, view: ViewType, CustomResultItem?: ICustomResultItem }) => {

    return (
        <div className={"grid gap-4 " + (view === "grid" ? "grid-cols-4 " : "grid-cols-1")}>
            {results.map((result, idx) => (
                CustomResultItem ? <CustomResultItem result={result} key={idx}/> :
                    <ResultItem result={result} key={idx}/>
            ))}
        </div>)
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
                <ViewListIcon className="h-6"/>
            ) : (
                <ViewGridIcon className="h-6"/>
            )}
        </div>
    );
};

export const Results = ({
                            results,
                            view: preferredView,
                            queries,
                            CustomResultItem
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
                <ViewSelector current={view} type="list" select={setView}/>
                <ViewSelector current={view} type="grid" select={setView}/>
            </div>

            {hasResults ? (
                <ResultsView results={selectedResults} view={view} CustomResultItem={CustomResultItem}/>
            ) : (
                "Search for something"
            )}
        </div>
    );
};
