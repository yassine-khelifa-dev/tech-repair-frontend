import { z } from "zod";

export const repairRequestSchema = z.object({
  fullname: z
    .string()
    .min(2, "Full name must contain at least 2 characters")
    .max(50, "Full name must contain maximum 50 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address, for example name@repair.com"),

  phone: z
    .string()
    .min(8, "Phone must contain at least 8 characters")
    .max(20, "Phone must contain maximum 20 characters")
    .regex(/^[0-9]+$/, "Phone must contain digits only"),

  imei: z
    .string()
    .min(1, "IMEI is required")
    .regex(/^[a-zA-Z0-9]+$/, "IMEI must contain letters and numbers only"),

  sn: z
    .string()
    .min(1, "Serial number is required")
    .regex(/^[a-zA-Z0-9]+$/, "Serial number must contain letters and numbers only"),

  issue_description: z
    .string()
    .min(5, "Description must contain at least 5 characters"),

  device_model_id: z
    .number()
    .int("Device model is required")
    .nullable()
    .refine((value): value is number => value !== null, {
      message: "Device model is required",
    }),
  option_ids: z.array(z.number()).min(1, "Select at least one option"),

  images_device: z.array(z.instanceof(File)).optional(),
});

export type RepairRequestFormInput = z.input<typeof repairRequestSchema>;
export type RepairRequestFormData = z.output<typeof repairRequestSchema>;
