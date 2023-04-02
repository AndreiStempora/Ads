import ReactPlayer from 'react-player';
import {useEffect, useRef, useState} from "react";

export const YoutubeComponent = ({data,setDuration,setRetry,creationTimeRef,TIMER_GAP, del}) => {
    const playerRef = useRef(null);
    const [playing , setPlaying] = useState(true);
    const [volume,setVolume] = useState(0);
    

    useEffect(() => {
        //if the link is not playable, request new ad
        if(!ReactPlayer.canPlay(data?.ad?.link)){
            setRetry((retry)=>retry + 1);  
        } 
    }, [])

    const setTimerTillStart = () => {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - creationTimeRef.current;
        if(timeDiff > TIMER_GAP){
            // setVolume(1);
            return 0;
        } 
        return TIMER_GAP - timeDiff;
    }
        
    const onReady = () => {
        const timer = setTimerTillStart();
        if(!timer === 0){
            setTimeout(() => {
                // setPlaying(true);
                setVolume(0);
                playerRef.current.seekTo(0);
                // console.log(timeStampRef.current - new Date().getTime())
            }, timer);
        } else {
            setVolume(0);
        }
    }

    const onStart = () => {
        // const timer = setTimerTillStart();
        // if(!timer === 0){
        //     setTimeout(() => {
        //         // setPlaying(true);
        //         playerRef.current.seekTo(0);
        //         setVolume(1);
        //         // console.log(timeStampRef.current - new Date().getTime())
        //     }, timer);
        // }
    }

    const onError = () => {
        setRetry((retry)=>retry + 1);
    }

    const onEnded = () => {
        // console.log('ended');
        let x = document.querySelectorAll("ion-content > div");
        // x[0].classList.add("fade-out");
        console.log(x);
        setTimeout(() => {
            del(false);
        }, 1000);
    }    
    
    return (
        <>
            <ReactPlayer
                ref = {playerRef}
                // url = {data?.ad?.link}
                url={"https://www.youtube.com/watch?v=UT5F9AXjwhg"}
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
                onDuration={(duration)=>{setDuration(duration * 1000)}}
                // onPause={()=>{console.log("pause!!!")}}
                // onBuffer={()=>{console.log("buffer!!!")}}
                // onBufferEnd={()=>{console.log("bufferEnd!!!")}}
                onError={onError}
                onEnded={onEnded}
            />
        </>
    )
}

