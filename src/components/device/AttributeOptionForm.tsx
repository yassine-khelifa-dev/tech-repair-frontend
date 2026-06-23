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
      <h3 className="text-lg font-semibold text-white">Specifications</h3>

      {attributes.map((attr) => (
        <div
          key={attr.id}
          className="rounded-2xl border border-gray-800 bg-neutral-900 p-5"
        >
          <p className="mb-4 text-sm font-semibold text-gray-200">
            {attr.name}

            {attr.unit && attr.unit !== "None" && (
              <span className="ml-1 text-gray-500">({attr.unit})</span>
            )}
          </p>

          <div className="flex flex-wrap gap-3">
            {attr.options?.map((opt) => {
              const isSelected = selectedOptions[attr.id] === opt.id;

              return (
                <label
                  key={opt.id}
                  className={
                    isSelected
                      ? `
                      cursor-pointer
                      rounded-full
                      border border-blue-500
                      bg-blue-600
                      px-5 py-2
                      text-sm font-medium
                      text-white
                      shadow-lg shadow-blue-600/20
                      transition-all
                    `
                      : `
                      cursor-pointer
                      rounded-full
                      border border-gray-700
                      bg-black
                      px-5 py-2
                      text-sm font-medium
                      text-gray-300
                      transition-all
                      hover:border-blue-500
                      hover:text-white
                    `
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
