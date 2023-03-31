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
    const [bg, setBg] = useState(<IonImg src={"/assets/images/genericBG.jpg"} ></IonImg>);
    const [imageC, setImageC] = useState();
    
    const createBackground = (string) => {
        return(<IonImg src={`${string}`} ></IonImg>)
    }
    
    const resendRequest = async() => {
        const data = await sendDeviceUuid();
        setData(data);
        
        if(data?.ads){
            history.push("/ads");
        }
    };
    
    useEffect(() => {
        (async () => {
            await resendRequest()
            
            const getRepeatTimer = () => {
                let timer = 0;
                data?.background.map((bg,i)=>{
                    timer += bg.stay * 1000;
                })
                return timer;
            }
            //repeat this for ever and ever
            //setInterval(()=>{
                data?.background.map((bg,i)=>{
                    setTimeout(async()=>{
                        setBg(createBackground(data?.background[i].link));
                        if(i === data?.background.length - 1){
                            await resendRequest();
                        }
                    }, i * bg.stay * 1000);
                })//}, getRepeatTimer());
        })();
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