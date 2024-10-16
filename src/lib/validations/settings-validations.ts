import { z } from "zod";

export const settingsFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(20, "Name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(20, "Last name is too long."),
  dateOfBirth: z.date(),
  bio: z.string().trim().max(200, "Bio is too long."),
  phoneNumber: z.string().max(30, "Phone number is too long."),
  location: z.string().trim().max(20, "Location is too long."),
});

export type TSettingsFormSchema = z.infer<typeof settingsFormSchema>;
