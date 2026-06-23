import { useEffect, useState } from "react";
import type { TBrand } from "../../types/TBrand";
import getBrands from "../../services/BrandService";

type Props = {
  onBrandChange: (number) => void;
};

export default function BrandForm({ onBrandChange }: Props) {
  const [brands, setBrands] = useState<TBrand[]>([]);
  const [brandId, setBrandId] = useState<number | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      setBrands(await getBrands());
    }
    loadInitialData();
  }, []);
  return (
    <>
      <div>
        <label
          htmlFor="brand"
          className="mb-2 block text-sm font-semibold text-white"
        >
          Brand
        </label>

        <select
          id="brand"
          value={brandId ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            const selectedBrandId = value === "" ? null : Number(value);
            setBrandId(selectedBrandId);
            onBrandChange(selectedBrandId);
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Select a brand</option>

          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
