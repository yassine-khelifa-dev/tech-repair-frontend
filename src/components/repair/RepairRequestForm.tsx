import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { repairRequestSchema, type RepairRequestFormData } from "../../schemas/repairRequestShema";
import createRepairRequest from "../../services/RepairRequestService";
import DeviceSelectorForm from "../device/DeviceSelectorForm";




export function RepairRequestForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RepairRequestFormData>({
    resolver: zodResolver(repairRequestSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      imei: "",
      sn: "",
      issue_description: "",
      device_model_id: -1,
      option_ids: [],
      images_device: [],
    },
  });

  async function submit(data: RepairRequestFormData) {
    const response = await createRepairRequest(data);

    console.log(response);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto max-w-4xl space-y-6 p-6"
    >
      <DeviceSelectorForm
        onModelChange={(modelId, optionIds) => {
          setValue("device_model_id", modelId ?? -1, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });

          setValue("option_ids", optionIds, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }}
      />

      {errors.device_model_id && (
        <p className="text-sm text-red-500">{errors.device_model_id.message}</p>
      )}

      {errors.option_ids && (
        <p className="text-sm text-red-500">{errors.option_ids.message}</p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Full name
          </label>
          <input
            type="text"
            {...register("fullname")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.fullname && (
            <p className="text-sm text-red-500">{errors.fullname.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Phone
          </label>
          <input
            type="text"
            {...register("phone")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            IMEI
          </label>
          <input
            type="text"
            {...register("imei")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.imei && (
            <p className="text-sm text-red-500">{errors.imei.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Serial number
          </label>
          <input
            type="text"
            {...register("sn")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.sn && (
            <p className="text-sm text-red-500">{errors.sn.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Device images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              setValue("images_device", files, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.images_device && (
            <p className="text-sm text-red-500">
              {errors.images_device.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Issue description
        </label>
        <textarea
          {...register("issue_description")}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
        {errors.issue_description && (
          <p className="text-sm text-red-500">
            {errors.issue_description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Send repair request
      </button>
    </form>
  );
}
