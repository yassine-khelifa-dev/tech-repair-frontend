import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  repairRequestSchema,
  type RepairRequestFormInput,
  type RepairRequestFormData,
} from "../../schemas/repairRequestShema";
import createRepairRequest from "../../services/RepairRequestService";
import DeviceSelectorForm from "../device/DeviceSelectorForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/ROUTES";
import axios from "axios";

export function RepairRequestForm() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, submitCount, touchedFields },
  } = useForm<RepairRequestFormInput, unknown, RepairRequestFormData>({
    resolver: zodResolver(repairRequestSchema),
    defaultValues: {
      fullname: "Marco Rossi",
      email: "",
      phone: "3331234567",
      imei: "356789012345678",
      sn: "SNDEMO2026",
      issue_description:
        "Buongiorno, ho un problema con il mio dispositivo: si riavvia da solo ogni cinque minuti. Vorrei sapere se potete controllarlo e fissare un appuntamento per la riparazione.",
      device_model_id: null,
      option_ids: [],
      images_device: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function submit(data: RepairRequestFormData) {
    try {
      setLoading(true);
      setServerError(null);
      await createRepairRequest(data);
      reset();
      navigate("/repair-request/success");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const message = error.response.data?.message ?? "Invalid repair request";
        const fieldErrors = error.response.data?.errors ?? {};

        Object.entries(fieldErrors).forEach(([field, messages]) => {
          const firstMessage = Array.isArray(messages) ? messages[0] : message;

          setError(field as keyof RepairRequestFormInput, {
            type: "server",
            message: String(firstMessage),
          });
        });

        setServerError(message);
        console.error(message);
        return;
      }

      setServerError("Unable to send repair request");
      console.error("h", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="inline-flex rounded-full border border-blue-800 px-5 py-2 text-sm font-medium text-blue-400">
              Tech Repair Center
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white">
              Repair request
            </h1>

            <p className="mt-3 text-lg text-gray-400">
              Fill in your device information and we will review your request.
            </p>
          </div>

          <Link
            to={ROUTES.HOME}
            className="rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-blue-500 hover:text-white"
          >
            Back home
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-8 rounded-3xl border border-gray-800 bg-neutral-950 p-8 shadow-2xl"
        >
          {serverError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {serverError}
            </div>
          )}

          <DeviceSelectorForm
            onModelChange={(modelId, optionIds) => {
              setValue("device_model_id", modelId ?? null, {
                shouldValidate: false,
                shouldDirty: true,
                shouldTouch: true,
              });

              setValue("option_ids", optionIds, {
                shouldValidate: false,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />

          {errors.device_model_id && submitCount > 0 && (
            <p className="text-sm text-red-400">
              {errors.device_model_id.message}
            </p>
          )}

          {errors.option_ids && submitCount > 0 && (
            <p className="text-sm text-red-400">{errors.option_ids.message}</p>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              ["Full name", "fullname", "text", "Marco Rossi"],
              ["Email", "email", "email", "@repair.com"],
              ["Phone", "phone", "text", "3331234567"],
              ["IMEI", "imei", "text", "356789012345678"],
              ["Serial number", "sn", "text", "SNDEMO2026"],
            ].map(([label, name, type, placeholder]) => (
              <div key={name}>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  {label}
                </label>

                <input
                  type={type}
                  placeholder={placeholder}
                  {...register(name as keyof RepairRequestFormData)}
                  className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

                {errors[name as keyof RepairRequestFormData] &&
                  (submitCount > 0 ||
                    touchedFields[name as keyof RepairRequestFormInput]) && (
                    <p className="mt-1 text-sm text-red-400">
                      {
                        errors[name as keyof RepairRequestFormData]
                          ?.message as string
                      }
                    </p>
                  )}
              </div>
            ))}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
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
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-300">
              Issue description
            </label>

            <textarea
              {...register("issue_description")}
              rows={5}
              placeholder="Buongiorno, il dispositivo si riavvia ogni cinque minuti. Vorrei fissare un appuntamento per controllarlo."
              className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            {errors.issue_description &&
              (submitCount > 0 || touchedFields.issue_description) && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.issue_description.message}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3 21l18-9L3 3l3 9Zm0 0h7"
                  />
                </svg>
                Send repair request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
