"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";

import EntityDialog from "@/components/common/entity-dialog";
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
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone: string = row.getValue("phone");

      return <div>{phone}</div>;
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
      const customerShipments = row.original.customerShipment;

      return <div>{customerShipments.length || 0}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <EntityDialog actionType="editCustomer" customer={customer}>
          <Edit className="h-5 w-5" />
        </EntityDialog>
      );
    },
  },
];
