import { z } from "zod";

export const repairRequestSchema = z.object({
  fullname: z
    .string()
    .min(2, "Full name must contain at least 2 characters")
    .max(50, "Full name must contain maximum 50 characters"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .min(8, "Phone must contain at least 8 characters")
    .max(25, "Phone must contain maximum 25 characters"),

  imei: z.string().min(1, "IMEI is required"),

  sn: z.string().min(1, "Serial number is required"),

  issue_description: z
    .string()
    .min(5, "Description must contain at least 5 characters"),

  device_model_id: z.number().int("Device model is required"),

  option_ids: z.array(z.number()).min(1, "Select at least one option"),

  images_device: z.array(z.instanceof(File)).optional(),
});

export type RepairRequestFormData = z.infer<typeof repairRequestSchema>;
