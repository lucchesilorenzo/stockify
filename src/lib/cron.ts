import cron from "node-cron";

import { updateCurrentMonthInventoryValue } from "@/lib/queries/analytics-queries";

// Update inventory value every first day of the month (every minute for testing)
export function inventoryCronJob() {
  cron.schedule("* * * * *", updateCurrentMonthInventoryValue);
}
