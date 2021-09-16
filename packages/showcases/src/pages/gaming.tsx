import {useState} from 'react'
import Head from "next/head";
import JinaClient, {
    BaseURL,
    RawDocumentData,
    SimpleResults,
    SimpleQueries,
    AnyObject,
    SimpleResponse,
    SimpleResult,
    fileToBase64
} from "@jina-ai/jinajs";
import { mockData } from '../gaming-response-mock-data'
import Result from '../components/Results'
import {SearchBar} from "../components/SearchBar";
import MeshResultItem from "../components/3d-model/MeshResultItem";

const GAMING_ENDPOINT = 'http://34.89.215.216:80/3d-search'

export default function GamingShowcase() {
    const [queries, setQueries] = useState<SimpleQueries>([]);
    const [results, setResults] = useState<SimpleResult[]>([]);
    const [searching, setSearching] = useState(false)
    const [searchedDocumentName, setSearchedDocumentName] = useState("")

    async function search(...documents: RawDocumentData[]) {
        setSearching(true);
        if (typeof documents[0] === "string") {
            setSearchedDocumentName(documents[0])
        } else {
            setSearchedDocumentName(documents[0].name)
        }
        const {results, queries} = await jinaClient.search(documents[0])
        setSearching(false);
        setResults(results);
        setQueries(queries);
    }
    return (
        <div>
            <Head>
                <title>Jina Showcases</title>
                <link rel="icon" href="/favicon.ico" />
                <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
            </Head>

            <SearchBar searching={searching} search={search}/>
            <div className="flex flex-wrap">
            {mockData.data.docs[0].matches.map(doc => (
                <MeshResultItem resultItem={doc} key={doc.id} />
            ))}
            </div>
        </div>
    )
}