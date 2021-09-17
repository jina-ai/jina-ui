type ResultItem = {
    id?: string
    data: string
    tags?: any
    adjacency?: number
    scores?: any    
}

type ResultItemProps = {
    result: ResultItem
    className?: string
}

// add model-viewer to JSX.IntrinsicElements
// model-viewer is a web component we're adding in the pages where we're using this component
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": any
        }
    }
}

export default function MeshResultItem ({result, className}: ResultItemProps) {
    const {data} = result
    return (
        <div className={className}>
            <model-viewer
                src={data}
                alt="result mesh"
                ar ar-modes="webxr scene-viewer quick-look"
                environment-image="neutral"
                interaction-policy="allow-when-focused"
                interaction-prompt="when-focused"
                camera-controls />
        </div>
    )
}