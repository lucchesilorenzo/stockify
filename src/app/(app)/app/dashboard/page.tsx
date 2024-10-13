import { columns } from "./columns";

import H1 from "@/components/common/h1";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import RecentActivitiesTable from "@/components/dashboard/recent-activities-table";
import { getRecentActivities } from "@/lib/queries/dashboard-queries";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const activities = await getRecentActivities();

  return (
    <main>
      <H1>Dashboard</H1>

      <div className="space-y-6 my-6">
        <DashboardSummary />

        <div className="my-6">
          <RecentActivitiesTable columns={columns} data={activities} />
        </div>
      </div>
    </main>
  );
}
