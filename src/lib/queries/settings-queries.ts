import { User } from "@prisma/client";

import prisma from "../db";
import { TSettingsFormSchema } from "../validations/settings-validations";

export async function updateSettingsByUserId(
  id: User["id"],
  settings: TSettingsFormSchema,
) {
  const updatedSettings = await prisma.user.update({
    where: {
      id,
    },
    data: settings,
  });

  return updatedSettings;
}

export async function getSettingsByUserId(id: User["id"]) {
  const settings = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      dateOfBirth: true,
      bio: true,
      phoneNumber: true,
      address: true,
      city: true,
      zipCode: true,
    },
  });

  return settings;
}
