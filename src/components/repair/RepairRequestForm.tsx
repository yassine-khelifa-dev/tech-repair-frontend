import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  repairRequestSchema,
  type RepairRequestFormData,
} from "../../schemas/repairRequestShema";
import createRepairRequest from "../../services/RepairRequestService";
import DeviceSelectorForm from "../device/DeviceSelectorForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RepairRequestForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
      device_model_id: null,
      option_ids: [],
      images_device: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function submit(data: RepairRequestFormData) {
    try {
      setLoading(true);
      setServerError(null);
      await createRepairRequest(data);
      reset();
      setSuccess(true);
      navigate("/repair-request/success");
    } catch (error) {
      if (error.response?.status === 422) {
        setServerError(error.response.data.message);
        console.error(error.response.data.message);
        return;
      }

      setServerError("Unable to send repair request");
      console.error("h", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto max-w-4xl space-y-6 p-6"
    >
      {serverError && (
        <div className="rounded-lg bg-red-100 p-3 text-red-700">
          {serverError}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-100 p-3 text-green-700">
          Repair request sent successfully.
        </div>
      )}

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
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send repair request"}
      </button>
    </form>
  );
}
