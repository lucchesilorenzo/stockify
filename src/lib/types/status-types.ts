export type ProductStatus = {
  value: "in-stock" | "out-of-stock" | "archived";
  label: "In Stock" | "Out of Stock" | "Archived";
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

export type FormDialogActionType =
  | "createOrder"
  | "createRestockOrder"
  | "editCustomer"
  | "addSupplier"
  | "addTask"
  | "editTask"
  | "generateTask";
