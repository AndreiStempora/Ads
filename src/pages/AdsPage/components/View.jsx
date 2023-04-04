import { useEffect, useState, useRef } from "react";
import useApi from "../../../api/api"
import {ImageComponent} from "../../../components/displays/image/ImageComponent";
import {VideoComponent} from "../../../components/displays/video/VideoComponent";
import {YoutubeComponent} from "../../../components/displays/youtube/YoutubeComponent";

export const View = ({setView,del}) =>{
    const [retry, setRetry] = useState(0);
    const {getAd} = useApi();
    const [data,setData] = useState(null);
    const [thisAdDuration,setThisAdDuration] = useState(0);
    const creationTimeRef = useRef();
    const TIMER_GAP = 3000;
    let timer;
    
    useEffect(() => {
        creationTimeRef.current = new Date().getTime();
        (async () => {
            const newData = await getAd();
            // console.log('not initial',newData)
            setData(newData);
        })();

        return () => {
            setData(null)
        }
    }, [retry])
    
    useEffect(() => {
    
    }, [data])

    const whenToPrepareNextAd = () => {
        // console.log(thisAdDuration,'wtf')
        if(thisAdDuration !== 0){
            setTimeout(() => {
                setView(true);
            }, thisAdDuration);
        }
    }

    useEffect(() => {whenToPrepareNextAd()}, [thisAdDuration])

    const selectDisplayComponent = () => {
        console.log(data,'data type');
        if(data?.ad?.type === "image"){
            return(
                <ImageComponent 
                    data={data} 
                    setDuration={setThisAdDuration}
                    setRetry={setRetry}
                    creationTimeRef={creationTimeRef}
                    TIMER_GAP={TIMER_GAP}
                    del={del}
                />
            )
        }
        if(data?.ad?.type === "video"){
            return(
                <VideoComponent 
                    data={data} 
                    setDuration={setThisAdDuration}
                    setRetry={setRetry}
                    creationTimeRef={creationTimeRef}
                    TIMER_GAP={TIMER_GAP}
                    del={del}
                />
            )
        }
        if(data?.ad?.type === "youtube"){
            return(
                <YoutubeComponent 
                    data={data} 
                    setDuration={setThisAdDuration}
                    setRetry={setRetry}
                    creationTimeRef={creationTimeRef}
                    TIMER_GAP={TIMER_GAP}
                    del={del}
                />
            )
        }
    }

    return(
        <>
             {data? selectDisplayComponent():null}
        </>
    )
}