import { useEffect} from 'react';
import {useAtom} from 'jotai';
import {Device} from "@capacitor/device"
import { uuidAtom } from "../../appState/deviceAtoms";

const useIdentifyDevice = () => {
    const [, uuid] = useAtom(uuidAtom);
    const determineUuid = async () => {
        if(uuid() === ''){
            const id = await Device.getId();
            uuid(id.uuid);
            return id.uuid;
        }
        return uuid();
    }
    return determineUuid;
};

export default useIdentifyDevice;