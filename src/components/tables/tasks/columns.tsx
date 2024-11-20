"use client";

import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowBigRight, ChevronsUpDown, Timer } from "lucide-react";

import TaskActions from "@/components/tasks/task-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTaskId } from "@/lib/utils";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const task = row.original;

      return <div className="font-medium">{formatTaskId(task)}</div>;
    },
  },
  {
    accessorKey: "title",
    id: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: Task["title"] = row.getValue("title");
      const label: Task["label"] = row.original.label;

      return (
        <div className="font-medium">
          <Badge>{label}</Badge> <span>{title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: Task["status"] = row.getValue("status");

      return (
        <div className="flex items-center justify-center gap-2">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    id: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority: Task["priority"] = row.getValue("priority");

      return (
        <div className="flex items-center justify-center gap-2">
          <ArrowBigRight className="h-4 w-4 text-muted-foreground" />
          <span>{priority}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return <TaskActions task={task} />;
    },
  },
];
