import ReactPlayer from 'react-player/youtube';
import React, {useEffect} from "react";

const YoutubeComponent = () => {
    const playerRef = React.useRef();
    const ready2 =(aaa)=> {console.log("ready2", aaa)}
    // console.log(playerRef.current.player.isReady)
    useEffect(() => {
        console.log(playerRef.current.getDuration())
    }, [playerRef])
    return (
        <ReactPlayer
            ref = {playerRef}
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