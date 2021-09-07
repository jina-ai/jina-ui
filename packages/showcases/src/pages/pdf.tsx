import {SearchBar} from "../components/SearchBar";
import {FlowDiagram} from "../components/FlowDiagram";
import JinaClient, {
    BaseURL,
    RawDocumentData,
    SimpleResults,
    SimpleQueries,
} from "@jina-ai/jinajs";
import React, {useState} from "react";
import {AnyObject, SimpleResponse, SimpleResult} from "../../../jinajs/dist/types";
import Results from "../components/Results";

const PDF_API_URL = "http://34.89.253.237:80"

const customReqSerializer = (documents: RawDocumentData[], version: string) => {
    return {
        "mime_type": "text",
        "data": documents[0]
    }
}

const customResSerializer = (response: AnyObject, version: string) => {
    const docs = response.data
    const queries: SimpleQueries = [];
    const results: SimpleResults[] = [];

    docs.forEach((doc: any) => {
        queries.push({
            data: doc.pdf,
            mimeType: "PDF"
        })
    })

    const result = docs.map((doc: any) => {
        return {
            data: doc.pdf,
            score: doc.score,
            mimeType: "application/pdf"
        }
    })

    results.push(result)
    return {queries, results} as SimpleResponse
}


export default function PDF() {

    const [queries, setQueries] = useState<SimpleQueries>([]);
    const [results, setResults] = useState<SimpleResults[]>([]);
    const [searching, setSearching] = useState(false);


    const jinaClient = new JinaClient(PDF_API_URL, customReqSerializer, customResSerializer)

    async function search(...documents: RawDocumentData[]) {
        setSearching(true);
        const {results, queries} = await jinaClient.search(...documents)
        setSearching(false);
        setResults(results);
        setQueries(queries);
    }

    return (
        <>
            <SearchBar searching={searching} search={search}/>
            <Results results={results} queries={queries}/>
            <FlowDiagram/>
        </>)
}