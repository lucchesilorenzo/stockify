import { z } from "zod";

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

export type TOrderFormSchema = z.infer<typeof orderFormSchema>;
