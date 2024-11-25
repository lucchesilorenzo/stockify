import { z } from "zod";

export const productIdSchema = z.string().cuid();

export const productEditFormSchema = z.object({
  description: z.string().trim().max(200, "Description is too long."),
  price: z.coerce
    .number({
      invalid_type_error: "Price must be a number.",
    })
    .positive("Price must be a positive number.")
    .max(99999, "Price is too long."),
  maxQuantity: z.coerce
    .number({
      invalid_type_error: "Max Quantity must be a number.",
    })
    .int("Max Quantity must be an integer.")
    .positive("Max Quantity must be a positive number.")
    .max(1000, "Max Quantity is too long."),
  categoryId: z.string().optional(),
  image: z.any().optional(),
  warehouseId: z.string().optional(),
});

export const productUploadImageSchema = z.object({
  image: z.instanceof(File),
  productId: z.string().cuid(),
});

export const productUpdateStatusSchema = z.enum([
  "In Stock",
  "Out of Stock",
  "Archived",
]);

// Types
export type TProductEditFormSchema = z.infer<typeof productEditFormSchema>;
