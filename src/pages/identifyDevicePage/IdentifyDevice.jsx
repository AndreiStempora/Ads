import {useAtom} from "jotai";
import {Redirect} from "react-router-dom";
import {useCallback} from "react";
import skipPageAtom from "../../components/deviceIdentificator/skipPage";
import IdentifyDeviceContent from "./IdentifyDeviceContent";

const IdentifyDevicePage = () => {
    const skipThisPageAtom = useAtom(skipPageAtom);
    
    const renderComponent = useCallback(() => {
        if (skipThisPageAtom[0] === false) {
            return (<IdentifyDeviceContent/>)
        }
        return (<Redirect to={'/home'}/>)
        
    }, []);
    
    return (renderComponent())
}

export default IdentifyDevicePage;