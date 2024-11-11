import { Metadata } from "next";

import H1 from "@/components/common/h1";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import ActivitiesTable from "@/components/tables/dashboard/activities-table";
import { columns } from "@/components/tables/dashboard/columns";
import { getRecentActivities } from "@/lib/queries/dashboard-queries";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const activities = await getRecentActivities();

  return (
    <main>
      <H1>Dashboard</H1>

      <div className="space-y-6 my-6">
        <DashboardSummary />

        <div className="my-6 grid grid-cols-1">
          <ActivitiesTable columns={columns} data={activities} />
        </div>
      </div>
    </main>
  );
}
