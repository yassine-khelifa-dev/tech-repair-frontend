import { useState } from "react";

import DeviceTypeForm from "./DeviceTypeForm";
import DeviceModelForm from "./DeviceModelForm";
import AttributeOptionForm from "./AttributeOptionForm";
import BrandForm from "../brand/BrandForm";

type Props = {
  onModelChange: (modelId: number | null, optionIds: number[]) => void;
};

function DeviceSelectorForm({ onModelChange }: Props) {
  const [deviceTypeId, setDeviceTypeId] = useState<number | null>(null);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [deviceModelId, setDeviceModelId] = useState<number | null>(null);

  function handleDeviceTypeChange(id: number | null) {
    setDeviceTypeId(id);
    setBrandId(null);
    setDeviceModelId(null);

    onModelChange(null, []);
  }

  function handleBrandChange(id: number | null) {
    setBrandId(id);
    setDeviceModelId(null);

    onModelChange(null, []);
  }

  function handleDeviceModelChange(id: number | null) {
    setDeviceModelId(id);

    onModelChange(id, []);
  }

  function handleOptionsChange(ids: number[]) {
    onModelChange(deviceModelId, ids);
  }

  return (
    <div className="w-full space-y-6 rounded-2xl border border-gray-800  bg-black p-6 shadow-sm"> 
      <DeviceTypeForm onDeviceTypeChange={handleDeviceTypeChange} />

      {deviceTypeId !== null && (
        <BrandForm key={deviceTypeId} onBrandChange={handleBrandChange} />
      )}

      {brandId !== null && deviceTypeId !== null && (
        <DeviceModelForm
          key={`${deviceTypeId}-${brandId}`}
          brandId={brandId}
          deviceTypeId={deviceTypeId}
          onDeviceModelChange={handleDeviceModelChange}
        />
      )}

      {deviceModelId !== null && (
        <AttributeOptionForm
          key={deviceModelId}
          deviceModelId={deviceModelId}
          onOptionsChange={handleOptionsChange}
        />
      )}
    </div>
  );
}

export default DeviceSelectorForm;
