"use client";

import { createContext } from "react";

import { Task } from "@prisma/client";
import { toast } from "sonner";

import {
  deleteTaskAction,
  updateTaskFieldAction,
} from "@/app/actions/task-actions";
import { TTaskFieldSchema } from "@/lib/validations/task-validations";

type TaskProviderProps = {
  children: React.ReactNode;
};

type TTaskContext = {
  handleDeleteTask: (taskId: Task["id"]) => Promise<void>;
  handleUpdateTaskField: (
    taskField: TTaskFieldSchema,
    taskValue: string,
    taskId: Task["id"],
  ) => Promise<void>;
};

export const TaskContext = createContext<TTaskContext | null>(null);

export default function TaskProvider({ children }: TaskProviderProps) {
  async function handleDeleteTask(taskId: Task["id"]) {
    const result = await deleteTaskAction(taskId);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Task deleted successfully.");
  }

  async function handleUpdateTaskField(
    taskField: TTaskFieldSchema,
    taskValue: string,
    taskId: Task["id"],
  ) {
    const result = await updateTaskFieldAction(taskField, taskValue, taskId);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Task updated successfully.");
  }

  return (
    <TaskContext.Provider value={{ handleDeleteTask, handleUpdateTaskField }}>
      {children}
    </TaskContext.Provider>
  );
}
