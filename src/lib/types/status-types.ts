export type ProductStatus = {
  value: "in-stock" | "out-of-stock";
  label: "In Stock" | "Out of Stock";
};

export type OrderType = {
  value: "new" | "restock";
  label: "New Orders" | "Restock Orders";
};

export type OrderStatus = {
  value: "pending" | "completed";
  label: "Pending" | "Completed";
};

export type TaskStatus = {
  value: "backlog" | "to-do" | "in-progress" | "done" | "canceled";
  label: "Backlog" | "To-Do" | "In Progress" | "Done" | "Canceled";
};

export type TaskPriority = {
  value: "low" | "medium" | "high";
  label: "Low" | "Medium" | "High";
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
