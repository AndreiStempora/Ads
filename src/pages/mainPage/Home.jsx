import {IonContent, IonPage} from '@ionic/react';
import {Device} from '@capacitor/device';
import './Home.css';
import YoutubeComponent from "../../components/youtube/Youtube";
import React, {useEffect} from "react";

const Home = () => {
    
    useEffect(() => {
        document.cookie = "cross-site-cookie=bar; SameSite=None; Secure";
    }, []);
    const logDeviceInfo = async () => {
        const info = await Device.getId();
        
        return info;
    };
    logDeviceInfo().then((info) => {
        console.log(info, 'ff');
    });
    console.log("Home.tsx");
    return (
        <IonPage>
            <IonContent fullscreen>
                <YoutubeComponent/>
            </IonContent>
        </IonPage>
    );
};

export default Home;