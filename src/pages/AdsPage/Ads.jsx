import {IonContent, IonPage} from '@ionic/react';
import './ads.css';
import React, {useEffect,useState} from "react";
import {ViewSwapper} from "./components/ViewSwapper";
import useApi from "../../api/api";
import { TickerComponent } from '../../components/newsTicker/TickerComponent';
const Ads = () => {
    const {sendDeviceUuid,getAd} = useApi();
    const [fetchNewAdToggle, setFetchNewAdToggle] = useState(false);
    const [data, setData] = useState();
    
    // useEffect(() => {
    //     (async () => {
    //         const newData = await getAd();
    //         // console.log(newData);
    //     })();
    // }, [fetchNewAdToggle]);
    
    
    return (
        <IonPage>
            <IonContent fullscreen>
                <ViewSwapper
                    oldFetch={fetchNewAdToggle}
                    newFetch={setFetchNewAdToggle}
                    data={data}
                ></ViewSwapper>
                <TickerComponent/>
            </IonContent>
        </IonPage>
    );
};

export default Ads;