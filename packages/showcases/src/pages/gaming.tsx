import Head from "next/head";
import { mockData } from '../gaming-response-mock-data'
import Result from '../components/Results'

export default function GamingShowcase() {
    return (
        <div>
            <Head>
                <title>Jina Showcases</title>
                <link rel="icon" href="/favicon.ico" />
                <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
            </Head>
            Gaming Showcase
            <div>
                Results
                <model-viewer src='/assets/bed_14.glb' alt="A 3D model of an astronaut" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls></model-viewer>
                <model-viewer src='/assets/jar_19.glb' alt="A 3D model of an astronaut" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls></model-viewer>
                <model-viewer src='/assets/microphone_mike_17.glb' alt="A 3D model of an astronaut" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls></model-viewer>
            </div>
        </div>
    )
}