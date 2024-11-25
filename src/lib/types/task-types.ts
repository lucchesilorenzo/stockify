import { Task } from "@prisma/client";

export type TaskWithUser = Task & {
  user: {
    firstName: string;
    lastName: string;
  };
};

export type TaskEssentials = Omit<Task, "id" | "createdAt" | "updatedAt">;

export type TaskStatus = {
  value: "backlog" | "to-do" | "in-progress" | "done" | "canceled";
  label: "Backlog" | "To-Do" | "In Progress" | "Done" | "Canceled";
  icon: React.ElementType;
};

export type TaskPriority = {
  value: "low" | "medium" | "high";
  label: "Low" | "Medium" | "High";
  icon: React.ElementType;
};

export type TaskLabel = {
  value:
    | "inventory"
    | "order"
    | "shipping"
    | "quality"
    | "customer"
    | "maintenance";
  label:
    | "Inventory"
    | "Order"
    | "Shipping"
    | "Quality"
    | "Customer"
    | "Maintenance";
};
