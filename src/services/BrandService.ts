import axios from "../api/axios";
import type { TBrand } from "../types/TBrand";

async function getBrands(): Promise<TBrand[]> {
  const response = await axios.get("/brands");
  return response.data.data;
}

export default getBrands;
