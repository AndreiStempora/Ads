import {atomWithStorage} from "jotai/utils";
import {atom} from "jotai";
export const localStorageUuidAtom = atomWithStorage("uuid", "");
export const uuidAtom = atom('',
    (get,set,update)=>{
        if(update === undefined){
            return get(localStorageUuidAtom);
        }
        set(localStorageUuidAtom, update);
    })