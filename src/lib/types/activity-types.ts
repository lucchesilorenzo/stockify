import { ProductEssentials } from "./product-types";

export type ActivityEssentials = {
  activity: "Created" | "Updated" | "Deleted";
  entity: "Product" | "Order" | "Shipment";
  product?: ProductEssentials["name"];
};
