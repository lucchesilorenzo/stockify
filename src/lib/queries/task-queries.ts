import { Task } from "@prisma/client";

import prisma from "../db";
import { TaskLabel, TaskPriority, TaskStatus } from "../types";
import { TaskEssentials } from "../types/task-types";
import {
  TTaskEditFormSchema,
  TTaskFieldSchema,
} from "../validations/task-validations";

export async function getTasks() {
  const tasks = await prisma.task.findMany();

  return tasks;
}

export async function createTask(task: TaskEssentials) {
  const newTask = await prisma.task.create({
    data: task,
  });

  return newTask;
}

export async function deleteTaskById(taskId: Task["id"]) {
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return deletedTask;
}

export async function updateTaskField(
  taskField: TTaskFieldSchema,
  taskValue: TaskLabel["value"] | TaskStatus["value"] | TaskPriority["value"],
  taskId: Task["id"],
) {
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      [taskField]: taskValue,
    },
  });

  return updatedTask;
}

export async function updateTask(
  task: TTaskEditFormSchema,
  taskId: Task["id"],
) {
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: task,
  });

  return updatedTask;
}
