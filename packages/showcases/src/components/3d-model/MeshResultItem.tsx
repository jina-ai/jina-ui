type ResultItem = {
    id: string
    uri: string
    tags?: any
    adjacency?: number
    scores?: any    
}

type ResultItemProps = {
    resultItem: ResultItem
    className?: string
}

export default function MeshResultItem ({resultItem, className}: ResultItemProps) {
    const {uri} = resultItem
    return (
        <div className={className}>
            <model-viewer
                src={uri}
                alt="result mesh"
                ar ar-modes="webxr scene-viewer quick-look"
                environment-image="neutral"
                auto-rotate
                camera-controls />
        </div>
    )
}