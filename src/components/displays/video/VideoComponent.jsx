import ReactPlayer from "react-player";
import {useHandleVideo} from "../../../hooks/handleVideoHook";
export const VideoComponent = ({data,setDuration,setRetry,creationTimeRef,TIMER_GAP, del}) => {
    const {playerRef,
        playing,
        volume,
        onReady,
        onStart,
        onError,
        onEnded,
        onBufferEnd} = useHandleVideo({data,setRetry,TIMER_GAP,creationTimeRef,del})
    console.log(data?.ad?.link)
    return (
        <ReactPlayer
            ref = {playerRef}
            // url={'https://www.youtube.com/watch?v=LXb3EKWsInQ'}
            url = {data?.ad?.link}
            width = "100%"
            height = "100%"
            controls = {false}
            playing = {playing}
            muted = {false}
            loop = {false}
            volume = {volume}
            playbackRate = {1}
            pip = {false}
            light = {false}
            onReady={onReady}
            onStart={onStart}
            // onPlay={()=>{console.log("play!!!")}}
            // onProgress={()=>{console.log("progress!!!")}}
            onDuration={(duration)=>{setDuration(duration * 1000)} }
            // onBuffer={()=>{console.log("buffer!!!")}}
            onBufferEnd={onBufferEnd}
            onError={onError}
            onEnded={onEnded}
        />
    )
}