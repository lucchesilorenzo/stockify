import AnalyticsTabs from "@/components/analytics/analytics-tabs";
import H1 from "@/components/common/h1";

export const metadata = {
  title: "Analytics",
};

export default function AnalyticsPage() {
  return (
    <main>
      <H1>Analytics</H1>

      <div className="my-6">
        <AnalyticsTabs />
      </div>
    </main>
  );
}
