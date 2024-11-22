"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createActivity } from "@/lib/queries/dashboard-queries";
import {
  createTask,
  deleteTaskById,
  updateTask,
  updateTaskField,
} from "@/lib/queries/task-queries";
import { ActivityEssentials } from "@/lib/types";
import {
  taskEditFormSchema,
  taskFieldSchema,
  taskFormSchema,
  taskIdSchema,
  taskLabelSchema,
  taskPrioritySchema,
  taskStatusSchema,
} from "@/lib/validations/task-validations";

export async function createTaskAction(task: unknown) {
  // Validation
  const validatedTask = taskFormSchema.safeParse(task);
  if (!validatedTask.success) {
    return { message: "Invalid form data." };
  }

  // Create task
  try {
    await createTask(validatedTask.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Task already exists." };
      }
    }
    return { message: "Failed to create task." };
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Created",
    entity: "Task",
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/tasks");
}

export async function deleteTaskAction(taskId: unknown) {
  const validatedTaskId = taskIdSchema.safeParse(taskId);
  if (!validatedTaskId.success) {
    return { message: "Invalid task ID." };
  }

  try {
    await deleteTaskById(validatedTaskId.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { message: "Task not found." };
      }
    }
    return { message: "Failed to delete task." };
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Deleted",
    entity: "Task",
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/tasks");
}

export async function updateTaskFieldAction(
  taskField: unknown,
  taskValue: unknown,
  taskId: unknown,
) {
  // Validation for task taskField
  const validatedTaskField = taskFieldSchema.safeParse(taskField);
  if (!validatedTaskField.success) {
    return { message: "Invalid data." };
  }

  // Validation for task taskValue
  let validatedTaskValue;

  switch (taskField) {
    case "label":
      validatedTaskValue = taskLabelSchema.safeParse(taskValue);
      break;
    case "status":
      validatedTaskValue = taskStatusSchema.safeParse(taskValue);
      break;
    case "priority":
      validatedTaskValue = taskPrioritySchema.safeParse(taskValue);
      break;
    default:
      return { message: "Invalid field." };
  }

  if (!validatedTaskValue.success) {
    return { message: "Invalid data." };
  }

  // Validation for task ID
  const validatedTaskId = taskIdSchema.safeParse(taskId);
  if (!validatedTaskId.success) {
    return { message: "Invalid task ID." };
  }

  // Update task label
  try {
    await updateTaskField(
      validatedTaskField.data,
      validatedTaskValue.data,
      validatedTaskId.data,
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { message: "Task not found." };
      }
    }
    return { message: "Failed to update task." };
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Updated",
    entity: "Task",
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/tasks");
}

export async function updateTaskAction(task: unknown, taskId: unknown) {
  // Validation for task
  const validatedTask = taskEditFormSchema.safeParse(task);
  if (!validatedTask.success) {
    return { message: "Invalid form data." };
  }

  // Validation for task ID
  const validatedTaskId = taskIdSchema.safeParse(taskId);
  if (!validatedTaskId.success) {
    return { message: "Invalid task ID." };
  }

  // Update task
  try {
    await updateTask(validatedTask.data, validatedTaskId.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { message: "Task not found." };
      }
    }
    return { message: "Failed to update task." };
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Updated",
    entity: "Task",
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/tasks");
}
