import ReactPlayer from 'react-player';
import {useHandleVideo} from "../../../hooks/handleVideoHook";

export const YoutubeComponent = ({data,setDuration,setRetry,creationTimeRef,TIMER_GAP, del}) => {
    const {playerRef,
        playing,
        volume,
        onReady,
        onStart,
        onError,
        onEnded,
        onBufferEnd} = useHandleVideo({data,setRetry,TIMER_GAP,creationTimeRef,del})
    return (
        <>
            <ReactPlayer
                ref = {playerRef}
                url = {data?.ad?.link}
                // url={"https://v2.stemads.stempora.me/public/stemads/emanuel/28.mp4?1637754027"}
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
                onDuration={(duration)=>{setDuration(duration * 1000); } }
                // onBuffer={()=>{console.log("buffer!!!")}}
                onBufferEnd={onBufferEnd}
                onError={onError}
                onEnded={onEnded}
            />
        </>
    )
}

