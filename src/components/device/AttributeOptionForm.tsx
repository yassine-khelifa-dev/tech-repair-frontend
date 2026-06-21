import { useEffect, useState } from "react";
import type { TAttribute } from "../../types/TAttribute";
import getAttributes from "../../services/AttributeService";

type Props = {
  deviceModelId: number | null;
  onOptionsChange: (optionIds: number[]) => void;
};

export default function AttributeOptionForm({
  deviceModelId,
  onOptionsChange,
}: Props) {
  const [attributes, setAttributes] = useState<TAttribute[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    async function loadAttributes() {
      if (!deviceModelId) {
        setAttributes([]);
        setSelectedOptions({});
        onOptionsChange([]);
        return;
      }

      const data = await getAttributes(deviceModelId);

      setAttributes(data);
      setSelectedOptions({});
      onOptionsChange([]);
    }

    loadAttributes();
  }, [deviceModelId]);

  function handleOptionChange(attributeId: number, optionId: number) {
    const nextSelectedOptions = {
      ...selectedOptions,
      [attributeId]: optionId,
    };

    setSelectedOptions(nextSelectedOptions);

    onOptionsChange(Object.values(nextSelectedOptions));
  }

  if (!deviceModelId) {
    return null;
  }

  if (attributes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold text-gray-800">Specifications</h3>

      {attributes.map((attr) => (
        <div
          key={attr.id}
          className="rounded-lg border border-gray-200 bg-white p-4"
        >
          <p className="mb-3 text-sm font-semibold text-gray-700">
            {attr.name}
            {attr.unit && attr.unit !== "None" && (
              <span className="ml-1 text-gray-400">({attr.unit})</span>
            )}
          </p>

          <div className="flex flex-wrap gap-2">
            {attr.options?.map((opt) => {
              const isSelected = selectedOptions[attr.id] === opt.id;

              return (
                <label
                  key={opt.id}
                  className={
                    isSelected
                      ? "cursor-pointer rounded-full border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                      : "cursor-pointer rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-500"
                  }
                >
                  <input
                    type="radio"
                    name={`attribute-${attr.id}`}
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => handleOptionChange(attr.id, opt.id)}
                    className="hidden"
                  />

                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
