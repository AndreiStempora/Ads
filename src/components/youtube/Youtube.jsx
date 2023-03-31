import ReactPlayer from 'react-player/youtube';
import React from "react";

const YoutubeComponent = () => {
    return (
        <ReactPlayer
            url = {"https://www.youtube.com/watch?v=pOJFAmpVA-k"}
            width = "100%"
            height = "100%"
            controls = {false}
            playing = {true}
            muted = {false}
            loop = {false}
            volume = {0.5}
            playbackRate = {1}
            pip = {false}
            light = {false}>
        </ReactPlayer>
    )
}

export default YoutubeComponent;