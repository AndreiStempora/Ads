import {useEffect, useRef, useState} from "react";
import ReactPlayer from "react-player";

export const useHandleVideo = ({data,setRetry,TIMER_GAP,creationTimeRef,del}) => {
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
        console.log('ready');
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
        console.log('start');
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
        // console.log(x);
        setTimeout(() => {
            del(false);
        }, 1000);
    }
    const onBufferEnd = () => {
        
        console.log('buffer end');
        
    }
    
    return{
        playerRef,
        playing,
        volume,
        onReady,
        onStart,
        onError,
        onEnded,
        onBufferEnd
        
    }
}