import {IonContent, IonPage, IonLabel} from "@ionic/react";
import { IonImg } from '@ionic/react';
import './identifyDeviceContent.scss';
import useApi from "../../api/api";
import {useEffect, useState} from "react";
import {useHistory} from "react-router";
const IdentifyDeviceContent = () => {
    const history = useHistory();
    const { sendDeviceUuid } = useApi();
    const [data, setData] = useState();
    const [bg, setBg] = useState();
    let interval;
    let clockInterval;
    
    const createBackground = (string) => {
        return(<IonImg src={`${string}`} ></IonImg>)
    }
    
    const resendRequest = async() => {
        const data = await sendDeviceUuid();
        setData(data);
        
        if(data?.ads){
            history.push("/ads");
        }
        return data;
    };
    
    useEffect(() => {
        (async () => {
            const newData = await resendRequest();
            try{
                if(newData?.background?.length !== 0){
                    const getRepeatTimer = () => {
                        let timer = 0;
                        newData?.background?.map((bg,i)=>{
                            timer += bg.stay * 1000;
                        })
                        return timer;
                    }
                    setBg(createBackground(newData?.background[0]?.link));
                    //repeat this for ever and ever
                    interval = setInterval(()=>{
                        // console.log("repeat",newData)
                        newData?.background?.map((bg,i)=>{
                            setTimeout(async()=>{
                                setBg(createBackground(newData?.background[i]?.link));
                                if(i === newData?.background?.length - 1){
                                    await resendRequest();
                                }
                            }, i * bg.stay * 1000);
                        })
                        }, getRepeatTimer());
                }
            } catch (e) {
                console.log(e);
            }
        })();
        
        return () => {
            clearInterval(interval);
        }
    }  , []);

    
    return (
        <IonPage>
            <IonContent fullscreen >
                <div className={"identify-device"}>
                    {bg}
                </div>
                {data?.code?
                <IonLabel className={"blinking-code"}>
                    <div>
                        <h2>Add a new device to your account and enter the code below</h2>
                        <h1>{data?.code}</h1>
                    </div>
                </IonLabel> : null}
            </IonContent>
        </IonPage>
    )
};

export default IdentifyDeviceContent;