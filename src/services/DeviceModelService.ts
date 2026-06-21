import axios from "../api/axios";
import type { TDeviceModel } from "../types/TDeviceModel";

async function getDeviceModels(
  deviceTypeId: number,
  brandId: number
): Promise<TDeviceModel[]> {
  const response = await axios.get("/device-models", {
    params: {
      brand_id: brandId,
      device_type_id: deviceTypeId,
    },
  });

  return response.data.data;
}

export default getDeviceModels;