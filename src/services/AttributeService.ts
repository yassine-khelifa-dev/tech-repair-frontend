import axios from "../api/axios";
import type { TAttribute } from "../types/TAttribute";

async function getAttributes(modelId: number): Promise<TAttribute[]> {
  const response = await axios.get(`device-models/${modelId}/attributes`);

  return response.data.data;
}

export default getAttributes;
