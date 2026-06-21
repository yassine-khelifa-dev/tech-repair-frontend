import { useEffect, useState } from "react";
import type { TDeviceModel } from "../../types/TDeviceModel";
import getDeviceModels from "../../services/DeviceModelService";

type Props = {
  brandId: number | null;
  deviceTypeId: number | null;
  onDeviceModelChange: (deviceModelId: number | null) => void;
};

export default function DeviceModelForm({
  brandId,
  deviceTypeId,
  onDeviceModelChange,
}: Props) {
  const [deviceModels, setDeviceModels] = useState<TDeviceModel[]>([]);
  const [deviceModelId, setDeviceModelId] = useState<number | null>(null);

  useEffect(() => {
    async function loadModels() {
      if (!brandId || !deviceTypeId) {
        setDeviceModels([]);
        setDeviceModelId(null);
        onDeviceModelChange(null);
        return;
      }

      const models = await getDeviceModels(deviceTypeId, brandId);

      setDeviceModels(models);
      setDeviceModelId(null);
      onDeviceModelChange(null);
    }

    loadModels();
  }, [brandId, deviceTypeId]);

  return (
    <div>
      <label
        htmlFor="deviceModel"
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        Device model
      </label>

      <select
        id="deviceModel"
        value={deviceModelId ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          const selectedDeviceModelId = value === "" ? null : Number(value);

          setDeviceModelId(selectedDeviceModelId);
          onDeviceModelChange(selectedDeviceModelId);
        }}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <option value="">Select a device model</option>

        {deviceModels.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}
