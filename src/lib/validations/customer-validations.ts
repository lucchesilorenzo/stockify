import { z } from "zod";

export const shippingFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(20, "First name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(20, "Last name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  phone: z.string().trim().max(30, "Phone number is too long."),
  address: z
    .string()
    .trim()
    .min(1, "Address is required.")
    .max(20, "Address is too long."),
  city: z
    .string()
    .trim()
    .min(1, "City is required.")
    .max(20, "City is too long."),
  zipcode: z
    .string()
    .trim()
    .min(1, "Zipcode is required.")
    .max(5, "Zipcode is too long."),
  products: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
      }),
    )
    .min(1, "At least one product is required."),
});

export type TShippingFormSchema = z.infer<typeof shippingFormSchema>;
