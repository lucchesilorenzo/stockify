import { z } from "zod";

export const productFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(20, "Name is too long."),
    barcode: z.string().trim().max(15, "Barcode is too long."),
    categoryId: z.string({
      required_error: "Category is required.",
    }),
    warehouseId: z.string({
      required_error: "Warehouse is required.",
    }),
    price: z.coerce
      .number({
        invalid_type_error: "Price must be a number.",
      })
      .positive("Price must be a positive number.")
      .min(1, "Price is required.")
      .max(99999, "Price is too long."),
    quantity: z.coerce
      .number({
        invalid_type_error: "Quantity must be a number.",
      })
      .int("Quantity must be an integer.")
      .positive("Quantity must be a positive number.")
      .min(1, "Quantity is required.")
      .max(100, "Quantity is too long."),
    maxQuantity: z.coerce
      .number({
        invalid_type_error: "Max Quantity must be a number.",
      })
      .int("Max Quantity must be an integer.")
      .positive("Max Quantity must be a positive number.")
      .min(1, "Max Quantity is required.")
      .max(100, "Max Quantity is too long."),
  })
  .refine((data) => data.quantity <= data.maxQuantity, {
    message: "Quantity must be less than or equal to Max Quantity.",
    path: ["quantity"],
  });

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

export type TProductFormSchema = z.infer<typeof productFormSchema>;
export type TProductEditFormSchema = z.infer<typeof productEditFormSchema>;
