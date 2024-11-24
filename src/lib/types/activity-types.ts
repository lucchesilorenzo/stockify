import { ProductEssentials } from "./product-types";

export type ActivityEssentials = {
  activity: "Created" | "Updated" | "Deleted" | "Archived" | "Restored";
  entity:
    | "Product"
    | "Order"
    | "Restock"
    | "Shipment"
    | "Customer"
    | "Supplier"
    | "Task";
  product?: ProductEssentials["name"];
};
