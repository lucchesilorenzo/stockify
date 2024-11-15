import { format } from "date-fns";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomer } from "@/hooks/use-customer";
import { CustomerShipmentWithItems } from "@/lib/types";

type CustomerViewShipmentsSelectProps = {
  customerShipment: CustomerShipmentWithItems[];
};

export default function CustomerViewShipmentsSelect({
  customerShipment,
}: CustomerViewShipmentsSelectProps) {
  const { handleSelectShipment } = useCustomer();

  return (
    <Select onValueChange={(value) => handleSelectShipment(value)}>
      <SelectTrigger id="shipment-select">
        <SelectValue placeholder="Select a shipment" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="max-h-60 overflow-y-auto">
          {customerShipment.map((shipment) => (
            <SelectItem key={shipment.id} value={shipment.id}>
              Shipment # {shipment.id} -{" "}
              {format(shipment.createdAt, "dd/MM/yyyy")}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
