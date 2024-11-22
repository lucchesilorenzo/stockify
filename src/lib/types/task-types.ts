import { Task } from "@prisma/client";

export type TaskEssentials = Omit<Task, "id" | "createdAt" | "updatedAt">;
