import axios from "axios";
import useIdentifyDevice from "../pages/identifyDevicePage/identifyDeviceHook";
const useApi = () => {
    const uuid = useIdentifyDevice();
const addBodyFormData = async(data) =>{
    const formData = new FormData();
    formData.append("fingerprint", await uuid());
    console.log("fingerPrint", await uuid());
    if(data !== undefined){
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
    }
    return formData;
}
const baseUrl = axios.create({
    baseURL: "https://v2.stemads.stempora.me/api/stemads",
});

const sendDeviceUuid = async (data) => {
    const formData = await addBodyFormData(data);
    const response = await baseUrl.post("/device", formData);
    return response.data;
};

const getAd = async (data) => {
    const formData = await addBodyFormData(data);
    const response = await baseUrl.post("/ad", formData);
    return response.data;
}

const getNewsTicker = async (data) => {
    const formData = await addBodyFormData(data);
    const response = await baseUrl.post("/ticker", formData);
    return response.data;
}

// export const getNewsTrack = async (uuid, track, ticker) => {
//
//     const response = await baseUrl.post(`/ticker/${track.ads.id}`, {
//         uuid,
//         track
//     });
//     return response.data;
// }
    return {sendDeviceUuid, getAd, getNewsTicker}
}

export default useApi;
