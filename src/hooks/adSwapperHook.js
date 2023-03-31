
import {useEffect, useState} from 'react';
import useApi from "../api/api";
export const useAdSwapper = () => {
    const [viewOne, setViewOne] = useState({});
    const [viewTwo, setViewTwo] = useState({});
    const [lastChangedViewOne, setLastChangedViewOne] = useState(false);
    const [data, setData] = useState({});
    const {getAd} = useApi();
    const DEFAULT_TIMEOUT = 3000;
    
    useEffect(() => {
        (async () => {
            const newData = await getAd();
            console.log("newData", newData);
        })();
        
        
    }, [viewOne, viewTwo]);
  
    const checkDataForATimer = () => {
    
    };
    const getAdData = async () => {
        const data = await getAd();
        setData(data);
    };
    const chooseWhatViewGetsUpdated = () => {
        if(lastChangedViewOne){
            setViewTwo(data);
        } else {
            setViewOne(data);
        }
    }
};


