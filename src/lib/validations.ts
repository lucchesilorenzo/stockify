import { z } from "zod";

// Schemas

export const authFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .max(20, "Password is too long."),
});

export const orderFormSchema = z.object({
  productId: z.string({
    required_error: "Product is required.",
  }),
  quantity: z.coerce
    .number({
      invalid_type_error: "Quantity must be a number.",
    })
    .int("Quantity must be an integer.")
    .positive("Quantity must be a positive number.")
    .min(1, "Quantity is required."),
});

export const productFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(20, "Name is too long."),
    categoryId: z.string({
      required_error: "Category is required.",
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
    minQuantity: z.coerce
      .number({
        invalid_type_error: "Min Quantity must be a number.",
      })
      .int("Min Quantity must be an integer.")
      .positive("Min Quantity must be a positive number.")
      .min(1, "Min Quantity is required.")
      .max(100, "Min Quantity is too long."),
  })
  .refine((data) => data.quantity <= data.maxQuantity, {
    message: "Quantity must be less than or equal to Max Quantity.",
    path: ["quantity"],
  })
  .refine((data) => data.quantity >= data.minQuantity, {
    message: "Quantity must be greater than or equal to Min Quantity.",
    path: ["quantity"],
  });

export const productIdSchema = z.string().cuid();

export const editProductFormSchema = z.object({
  name: z.string().trim().max(20, "Name is too long."),
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
    .max(100, "Max Quantity is too long."),
  categoryId: z.string().optional(),
  status: z.string().optional(),
});

// Types

export type TAuthFormSchema = z.infer<typeof authFormSchema>;
export type TOrderFormSchema = z.infer<typeof orderFormSchema>;
export type TProductFormSchema = z.infer<typeof productFormSchema>;
export type TEditProductFormSchema = z.infer<typeof editProductFormSchema>;
