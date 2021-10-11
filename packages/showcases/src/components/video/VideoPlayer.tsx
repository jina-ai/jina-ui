import React from "react"
import ReactPlayer from "react-player"

type VideoPlayerProps = {
    result: any
    timeStamp?: number
}
export default function VideoPlayer ({result, timeStamp}: VideoPlayerProps) {
    return (
        <ReactPlayer url={`${result.data}&t=${timeStamp || 0}`} width="100%" height="20rem" controls />
    )
}