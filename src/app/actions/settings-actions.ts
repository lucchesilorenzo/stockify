"use server";

import { revalidatePath } from "next/cache";

import { updateSettingsByUserId } from "@/lib/queries/settings-queries";
import { checkAuth } from "@/lib/utils";
import { settingsFormSchema } from "@/lib/validations/settings-validations";

export async function updateSettings(settings: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation
  const validatedSettings = settingsFormSchema.safeParse(settings);
  if (!validatedSettings.success) {
    return { message: "Invalid form data." };
  }

  // Update settings
  try {
    await updateSettingsByUserId(session.user.id, validatedSettings.data);
  } catch {
    return { message: "Failed to update settings." };
  }

  revalidatePath("/app/account/settings");
}
