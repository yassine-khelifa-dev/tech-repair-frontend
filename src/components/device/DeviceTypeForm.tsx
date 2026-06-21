import { useEffect, useState } from "react";
import type { TDeviceType } from "../../types/TDeviceType";
import getDeviceType from "../../services/DeviceTypeService";

type Props = {
  onDeviceTypeChange: (deviceTypeId: number | null) => void;
};

export default function DeviceTypeForm({ onDeviceTypeChange }: Props) {
  const [deviceTypes, setDeviceTypes] = useState<TDeviceType[]>([]);
  const [deviceTypeId, setDeviceTypeId] = useState<number | null>(null);

  useEffect(() => {
    async function loadDeviceTypes() {
      const data = await getDeviceType();
      setDeviceTypes(data);
    }

    loadDeviceTypes();
  }, []);

  return (
    <div>
      <label
        htmlFor="deviceType"
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        Device type
      </label>

      <select
        id="deviceType"
        value={deviceTypeId ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          const selectedDeviceTypeId = value === "" ? null : Number(value);

          setDeviceTypeId(selectedDeviceTypeId);
          onDeviceTypeChange(selectedDeviceTypeId);
        }}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <option value="">Select a type</option>

        {deviceTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}
