import {SearchBar} from "../components/SearchBar";
import {FlowDiagram} from "../components/FlowDiagram";
import JinaClient, {
    BaseURL,
    RawDocumentData,
    SimpleResults,
    SimpleQueries,
} from "@jina-ai/jinajs";
import { useState } from "react";

const PDF_API_URL = "http://34.89.253.237:80"
export default function PDF() {

    const [queries, setQueries] = useState<SimpleQueries>([]);
    const [results, setResults] = useState<SimpleResults[]>([]);
    const [searching, setSearching] = useState(false);


    const jinaClient = new JinaClient(PDF_API_URL)

    async function search(...documents: RawDocumentData[]) {
        setSearching(true);
        const { results, queries } = await jinaClient.search(...documents)
        setSearching(false);
        setResults(results);
        setQueries(queries);
        console.log(results)
    }
    return (
        <>
            <SearchBar searching={searching} search={search}/>
            <FlowDiagram/>
        </>)
}