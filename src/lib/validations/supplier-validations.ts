import { z } from "zod";

export const supplierFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(20, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .max(15, "Phone number is too long.")
    .optional(),
});

export const supplierIdSchema = z.string().cuid();
export const supplierRatingSchema = z.number().min(1).max(5);

export type TSupplierRatingSchema = z.infer<typeof supplierRatingSchema>;
export type TSupplierFormSchema = z.infer<typeof supplierFormSchema>;