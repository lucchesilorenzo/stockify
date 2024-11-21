"use client";

import React from "react";

import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

import TaskActions from "@/components/tasks/task-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { taskPriorities, taskStatuses } from "@/lib/data";
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
    accessorKey: "label",
    id: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type: Task["label"] = row.getValue("label");

      return <Badge variant="outline">{type}</Badge>;
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

      return <div className="font-medium">{title}</div>;
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

      const statusInfo = taskStatuses.find((item) => item.label === status);
      const Icon = statusInfo?.icon ?? "";

      return (
        <div className="flex items-center justify-center gap-2">
          {React.createElement(Icon, {
            className: "h-4 w-4 text-muted-foreground",
          })}
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

      const priorityInfo = taskPriorities.find(
        (item) => item.label === priority,
      );
      const Icon = priorityInfo?.icon ?? "";

      return (
        <div className="flex items-center justify-center gap-2">
          {React.createElement(Icon, {
            className: "h-4 w-4 text-muted-foreground",
          })}
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
