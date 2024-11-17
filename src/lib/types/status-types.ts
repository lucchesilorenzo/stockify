export type ProductStatus = {
  value: "in-stock" | "out-of-stock";
  label: "In Stock" | "Out of Stock";
};

export type OrderType = {
  value: "new" | "restock";
  label: "New" | "Restock";
};

export type OrderStatus = {
  value: "pending" | "completed";
  label: "Pending" | "Completed";
};
