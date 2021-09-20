import React, {ComponentType, ReactNode, useState} from "react";
import {SimpleQueries, SimpleResult, SimpleResults} from "@jina-ai/jinajs";
import {ResultItem} from "./ResultItem";
import {QuerySelector} from "./Queries";
import {ViewGridIcon, ViewListIcon} from "@heroicons/react/outline";

type CustomResultItemProps = {
    result: SimpleResult
}
export type ICustomResultItem = ComponentType<CustomResultItemProps>

export type ResultsProps = {
    results: SimpleResults[];
    queries?: SimpleQueries;
    CustomResultItem?: ICustomResultItem
};

export const Results = ({
                            results,
                            queries,
                            CustomResultItem
                        }: ResultsProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const hasResults = results.length > 0;
    const selectedResults = results[selectedIndex];

    return (
        <div className="relative max-w-full overflow-hidden">
            <QuerySelector
                queries={queries}
                selectedIndex={selectedIndex}
                select={setSelectedIndex}
            />

            {hasResults ? (
                <div className={"flex flex-wrap justify-center"}>
                    {selectedResults.map((result, idx) => (
                        CustomResultItem ?
                            <CustomResultItem result={result} key={idx}/>
                            :
                            <ResultItem result={result} key={idx}/>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
