"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Mail, Phone } from "lucide-react";
import { formatPhoneNumberIntl } from "react-phone-number-input";

import FormDialog from "@/components/common/form-dialog";
import CustomerViewShipmentsDialog from "@/components/customers/customer-view-shipments/customer-view-shipments-dialog";
import { CustomerWithCustomerShipment } from "@/lib/types";

export const columns: ColumnDef<CustomerWithCustomerShipment>[] = [
  {
    id: "fullName",
    header: "Name",
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;

      return <div className="font-medium">{`${firstName} ${lastName}`}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      const fullName = `${row.original.firstName} ${row.original.lastName}`;

      return fullName.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "email",
    id: "email",
    header: "Email",
    cell: ({ row }) => {
      const email: string = row.getValue("email");

      return (
        <div className="flex items-center justify-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    id: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone: string = row.getValue("phone");

      return (
        <div className="flex items-center justify-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{formatPhoneNumberIntl(phone)}</span>
        </div>
      );
    },
  },
  {
    id: "fullAddress",
    header: "Address",
    cell: ({ row }) => {
      const address = row.original.address;
      const city = row.original.city;
      const zipCode = row.original.zipCode;

      return <div>{`${address}, ${city}, ${zipCode}`}</div>;
    },
  },
  {
    id: "customerShipments",
    header: "Shipments",
    cell: ({ row }) => {
      const customerShipments = row.original.customerShipments;

      return <div>{customerShipments.length || 0}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      const customerShipment = customer.customerShipments;

      return (
        <div className="flex items-center gap-2">
          <CustomerViewShipmentsDialog customerShipment={customerShipment}>
            📋
          </CustomerViewShipmentsDialog>

          <FormDialog actionType="editCustomer" customer={customer}>
            ✏️
          </FormDialog>
        </div>
      );
    },
  },
];
