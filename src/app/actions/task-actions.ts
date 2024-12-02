"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Ollama } from "ollama";

import { exampleOutput, taskStructure } from "@/lib/prompts";
import { createActivity } from "@/lib/queries/dashboard-queries";
import {
  createTask,
  deleteTaskById,
  updateTask,
  updateTaskField,
} from "@/lib/queries/task-queries";
import { ActivityEssentials } from "@/lib/types";
import { checkAuth } from "@/lib/utils";
import {
  taskEditFormSchema,
  taskFieldSchema,
  taskFormSchema,
  taskGeneratorFormSchema,
  taskIdSchema,
  taskLabelSchema,
  taskPrioritySchema,
  taskStatusSchema,
} from "@/lib/validations/task-validations";

export async function createTaskAction(task: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation
  const validatedTask = taskFormSchema.safeParse(task);
  if (!validatedTask.success) {
    return { message: "Invalid form data." };
  }

  // Add user ID
  const taskWithUser = {
    ...validatedTask.data,
    userId: session.user.id,
  };

  // Create task
  try {
    await createTask(taskWithUser);
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
    activity: "CREATED",
    entity: "Task",
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/tasks");
}

export async function deleteTaskAction(taskId: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation
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
    activity: "DELETED",
    entity: "Task",
    userId: session.user.id,
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
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation for taskField
  const validatedTaskField = taskFieldSchema.safeParse(taskField);
  if (!validatedTaskField.success) {
    return { message: "Invalid data." };
  }

  // Validation for taskValue
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
    activity: "UPDATED",
    entity: "Task",
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/tasks");
}

export async function updateTaskAction(task: unknown, taskId: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

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
    activity: "UPDATED",
    entity: "Task",
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/tasks");
}

export async function generateTasks(prompt: unknown) {
  const validatedPrompt = taskGeneratorFormSchema.safeParse(prompt);
  if (!validatedPrompt.success) {
    return { message: "Invalid form data." };
  }

  const numTasks = validatedPrompt.data.numTasks || 5;
  const description = validatedPrompt.data.prompt;

  const finalPrompt = `${description}. Generate ${numTasks} tasks. ${taskStructure} ${exampleOutput} Return only a pure JSON array of tasks, without extra formatting.`;

  const ollama = new Ollama();

  try {
    const res = await ollama.chat({
      model: "qwen2.5-coder:1.5b",
      messages: [
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      format: "json",
    });

    const { tasks } = JSON.parse(res.message.content);

    for (const task of tasks) {
      await createTaskAction(task);
    }
  } catch {
    return { message: "Failed to generate tasks." };
  }
}
