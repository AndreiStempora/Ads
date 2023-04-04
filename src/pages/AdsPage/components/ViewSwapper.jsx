import {useState} from "react";
import {View} from "./View";

export const ViewSwapper = ({data, newFetch}) => {
    const [viewOne, setViewOne] = useState(true);
    const [viewTwo, setViewTwo] = useState(false);
    
    return(
        <>
            {viewOne?
                <View setView={setViewTwo} del={setViewOne}></View>:null
            }
            {viewTwo?
                <View setView={setViewOne} del={setViewTwo}></View>:null
            }
        </>
    )
}