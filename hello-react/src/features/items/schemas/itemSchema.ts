import { z } from "zod";

export const itemSchema = z.object({
  brand: z
    .string()
    .trim()
    .min(1, "Brand is required")
    .max(144, "Brand cannot exceed 144 characters"),

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(256, "Title cannot exceed 256 characters"),

  date: z
    .string()
    .min(1, "Date is required"),

  mileage: z
    .number({
      required_error: "Mileage is required",
      invalid_type_error: "Mileage must be a number",
    })
    .positive("Mileage must be greater than 0"),

  color: z
    .string()
    .trim()
    .min(1, "Color is required"),

  validPermission: z.boolean(),
});

export type ItemFormData = z.infer<typeof itemSchema>;