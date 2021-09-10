import Head from "next/head";
import { mockData } from '../gaming-response-mock-data'
import Result from '../components/Results'
import MeshResultItem from "../components/3d-model/MeshResultItem";

export default function GamingShowcase() {
    return (
        <div>
            <Head>
                <title>Jina Showcases</title>
                <link rel="icon" href="/favicon.ico" />
                <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
            </Head>
            Gaming Showcase
            <div className="flex flex-wrap">
            {mockData.data.docs[0].matches.map(doc => (
                <MeshResultItem resultItem={doc} key={doc.id} />
            ))}
            </div>
        </div>
    )
}