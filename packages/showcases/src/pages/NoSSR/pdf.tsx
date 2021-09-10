import {SearchBar} from "../../components/SearchBar";
import {FlowDiagram} from "../../components/FlowDiagram";
import JinaClient, {
    BaseURL,
    RawDocumentData,
    SimpleResults,
    SimpleQueries,
    AnyObject,
    SimpleResponse,
    SimpleResult
} from "@jina-ai/jinajs";
import React, {useState} from "react";
import Results from "../../components/Results";

const PDF_API_URL = "http://34.89.253.237:80"

type CustomResult = any
type CustomResults = any


const customReqSerializer = (documents: RawDocumentData[], version: string) => {
    return {
        "mime_type": "text",
        "data": documents[0]
    }
}

const customResSerializer = (response: AnyObject, version: string) => {

    const docs = response.data
    const queries: SimpleQueries = [];
    const results: CustomResults[] = [];

    docs.forEach((doc: any) => {
        queries.push({
            data: doc.pdf,
            mimeType: "application/pdf"
        })
    })

    const result = docs
    results.push(result)
    return {queries, results}
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

    const CustomResultItem = (result: CustomResult) => {
        const {thumbnail, pdf_name, pdf, page} = result.result

        return (
            <div className="cursor-pointer max-w-lg" onClick={() => window.open(pdf, "_blank")}>
                <div className="rounded-xl border border-primary-500 m-b-3 overflow-hidden h-96">
                    <img src={thumbnail} alt="pdf thumbnail" />
                </div>

                <div className="px-8 pt-4 flex justify-between">
                    <div className="font-semibold max-w-xs">{pdf_name}</div>
                    <div className="float-right text-gray-700">Page {parseInt(page) + 1}</div>
                </div>
            </div>)
    }

    return (
        <>
            <SearchBar searching={searching} search={search}/>
            <Results results={results} CustomResultItem={CustomResultItem}/>
            <FlowDiagram/>
        </>)
}