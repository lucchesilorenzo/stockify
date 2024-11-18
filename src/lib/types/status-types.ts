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
