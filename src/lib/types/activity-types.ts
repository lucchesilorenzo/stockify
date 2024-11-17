import { ProductEssentials } from "./product-types";

export type ActivityEssentials = {
  activity: "Created" | "Updated" | "Deleted";
  entity: "Product" | "Order" | "Restock" | "Shipment" | "Customer";
  product?: ProductEssentials["name"];
};
