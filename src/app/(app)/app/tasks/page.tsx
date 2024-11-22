import { Metadata } from "next";

import H1 from "@/components/common/h1";
import { columns } from "@/components/tables/tasks/columns";
import TasksTable from "@/components/tables/tasks/tasks-table";
import { getTasks } from "@/lib/queries/task-queries";

export const metadata: Metadata = {
  title: "Tasks",
};

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <main>
      <H1>Tasks</H1>
      <p className="mt-1 text-muted-foreground">
        Manage and track tasks related to your warehouse.
      </p>

      <div className="my-6 grid grid-cols-1">
        <TasksTable columns={columns} data={tasks} />
      </div>
    </main>
  );
}
