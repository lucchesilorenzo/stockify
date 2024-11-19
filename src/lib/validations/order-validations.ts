import { z } from "zod";

export const orderFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(20, "Name is too long."),
    categoryId: z.string({
      required_error: "Category is required.",
    }),
    warehouseId: z.string({
      required_error: "Warehouse is required.",
    }),
    supplierId: z.string({
      required_error: "Supplier is required.",
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

export const restockOrderFormSchema = z.object({
  productId: z.string({
    required_error: "Product is required.",
  }),
  supplierId: z.string({
    required_error: "Supplier is required.",
  }),
  quantity: z.coerce
    .number({
      invalid_type_error: "Quantity must be a number.",
    })
    .int("Quantity must be an integer.")
    .positive("Quantity must be a positive number.")
    .min(1, "Quantity is required."),
});

export const orderStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["Pending", "Completed"]),
});

export type TOrderFormSchema = z.infer<typeof orderFormSchema>;
export type TRestockOrderFormSchema = z.infer<typeof restockOrderFormSchema>;
