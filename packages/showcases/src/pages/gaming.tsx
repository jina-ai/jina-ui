import { useState } from 'react'
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
import { OpenAPIV3 } from "openapi-types";
import schema from "../types/pdf/schema.json"
import { mockData } from '../gaming-response-mock-data'
import Results from "../components/Results";
import { Spinner } from "../components/Spinner"
import { SearchBar } from "../components/SearchBar";
import MeshResultItem from "../components/3d-model/MeshResultItem";
import SampleQueries from '../components/3d-model/SampleQueries';

const GAMING_ENDPOINT = 'https://europe-west3-jina-showcase.cloudfunctions.net/proxy3d/3d/'

export default function GamingShowcase() {
    const [queries, setQueries] = useState<SimpleQueries>([]);
    const [results, setResults] = useState<SimpleResults[]>([]);
    const [searching, setSearching] = useState(false)
    const [searchedDocumentName, setSearchedDocumentName] = useState("")

    const jinaClient = new JinaClient(GAMING_ENDPOINT, schema as OpenAPIV3.Document, false, customRequestSerializer, customReponseSerializer)


    async function search(...documents: RawDocumentData[]) {
        if(searching) return
        setSearching(true);
        if (typeof documents[0] === "string") {
            setSearchedDocumentName(documents[0])
        } else {
            setSearchedDocumentName(documents[0].name)
        }
        const { results, queries } = await jinaClient.search(documents[0])
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
            <SampleQueries handleSelectExample={search} />
            {searching ? (
                <Searching />
            ) : (
                    queries.length?<>
                        <h2 className="font-bold text-xl mb-3">
                            Results:
            </h2>
                        <Results results={results} CustomResultItem={MeshResultItem} />
                    </>:""
                )}
        </div>
    )
}

const customRequestSerializer = async (documents: RawDocumentData[]) => {
    const doc = documents[0]
    if (doc instanceof File) {
        const uri = await fileToBase64(doc)
        const cleanedUri = uri.substring(uri.indexOf(',') + 1)
        return {
            "mime_type": "model/gltf-binary",
            "data": cleanedUri
        }
    } else if (typeof (doc) === 'string' && doc.slice(0, 4) === 'http') {
        return {
            "data": [{ "uri": doc }]
        }
    } else {
        return {
            "data": [{ "text": doc }]
        }
    }
}

const customReponseSerializer = (rawResponse: AnyObject) => {
    const docs = rawResponse.data.data.docs;
    const results: SimpleResults[] = [];
    const queries: SimpleQueries = [];
    docs.forEach((doc: any) => {
        queries.push({
            data: doc.text || doc.uri,
            mimeType: doc.mimeType,
        });
        const { matches } = doc;
        results.push(
            matches.sort((match1: any, match2: any) => match1.scores.cosine.value - match2.scores.cosine.value).map(({ scores, text, uri, tags, mimeType }: any) => {
                const score = scores.cosine.value
                    ? scores.cosine.value
                    : scores.score?.value;
                return {
                    data: tags?.glb_path || text || uri,
                    mimeType,
                    score,
                } as SimpleResult;
            })
        );
    });
    return { queries, results };
}

const Searching = () => (
    <div className="mx-auto text-3xl py-36 flex flex-row items-center text-primary-500">
        <Spinner />
        <span className="animate-pulse">Searching...</span>
    </div>
);
