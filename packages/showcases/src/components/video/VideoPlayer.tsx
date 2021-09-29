import React from "react"
import ReactPlayer from "react-player"

type VideoPlayerProps = {
    url: string
    timeStamp?: number
}
export default function VideoPlayer ({url, timeStamp}: VideoPlayerProps) {
    return (
        <ReactPlayer url={`${url}&t=${timeStamp}`} width="100%" height="20rem" controls />
    )
}