import {useEffect, useState, useRef} from "react";
import {View} from "./View";
import {useAdSwapper} from "../../../hooks/adSwapperHook";
import YoutubeComponent from "../../../components/displays/youtube/YoutubeComponent";

export const ViewSwapper = ({data, newFetch}) => {
    const [view, setView] = useState([]);
    const useAddSwapper = useAdSwapper();
    
    return(
        <>
            <View title={"1"}></View>
            <View title={"2"}></View>
            <YoutubeComponent/>
            {/*<VideoComponent/>*/}
    </>
    )
}