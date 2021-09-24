import React from 'react';
import MeshResultItem from './MeshResultItem';

type SampleQueriesProps = {
    handleSelectExample: (uri: string) => void
}

export default function SampleQueries({ handleSelectExample }: SampleQueriesProps) {
    const samepleQueryURIs = [
        "https://storage.googleapis.com/showcase-3d-models/ShapeNetV2/cap_2.glb",
        "https://storage.googleapis.com/showcase-3d-models/ShapeNetV2/piano_pianoforte_forte-piano_14.glb",
        "https://storage.googleapis.com/showcase-3d-models/ShapeNetV2/rifle_7.glb",
    ]
    return (
        <div className="border-b-2 border-t-2 py-3 mt-6">
            <h2 className="font-bold text-xl mb-3">Example queries:</h2>
            <div className="flex">
                {samepleQueryURIs.map((uri, i) =>
                    <div key={i} className=" py-4 px-8 bg-white shadow-lg rounded-lg m-4" onClick={() => handleSelectExample(uri)}>
                        <MeshResultItem result={{data: uri}} />
                    </div>
                )}
            </div>
        </div>
    )
}