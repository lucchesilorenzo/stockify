import { Metadata } from "next";

import H1 from "@/components/common/h1";
import SettingsForm from "@/components/settings/settings-form";
import { Separator } from "@/components/ui/separator";
import { getSettingsByUserId } from "@/lib/queries/settings-queries";
import { checkAuth } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const session = await checkAuth();
  const userSettings = await getSettingsByUserId(session.user.id);

  return (
    <main>
      <div className="space-y-1">
        <H1>Settings</H1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      <Separator className="my-6" />

      <SettingsForm userSettings={userSettings} />
    </main>
  );
}
