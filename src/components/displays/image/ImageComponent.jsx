import React, {useEffect} from 'react';
import {IonImg} from "@ionic/react";
import './image.scss';
export const ImageComponent = ({data,setDuration,setRetry,creationTimeRef,TIMER_GAP, del}) => {
    
    const checkImage = async (url)=>{
        
        const res = await fetch(url, {mode:'cors'});
        const buff = await res.blob();
        
        return buff.type.startsWith('image/')
    }
    
    useEffect(() => {
        (async () => {
            // const isImage = await checkImage(data.ad.link);
            // if(!isImage){
            //     setRetry(true);
            //     return;
            // }
            setDuration(data?.ad?.stay * 1000);
    
            setTimeout(() => {
                del(false);
            }, 1000 + data?.ad?.stay * 1000 + TIMER_GAP)
        })();
        
    }, [])
    
    return(
        <>
            <div className="image-container">
                <IonImg src={data.ad.link}></IonImg>
                
            </div>
        </>
    )
}