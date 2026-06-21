import axios from "../api/axios";
import type { TDeviceType } from "../types/TDeviceType";


async function getDeviceType() : Promise<TDeviceType[]> {
    const response = await axios.get('device-types');
    return response.data.data;
}


export default getDeviceType;