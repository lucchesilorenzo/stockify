import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(100, "Title is too long."),
  status: z.string({
    required_error: "Status is required.",
  }),
  priority: z.string({
    required_error: "Priority is required.",
  }),
  label: z.string({
    required_error: "Label is required.",
  }),
  dueDate: z.date({
    required_error: "Due date is required.",
  }),
});

export const taskEditFormSchema = z.object({
  title: z.string().trim().max(100, "Title is too long.").optional(),
  dueDate: z.date().optional(),
});

export const taskIdSchema = z.string().cuid();

export const taskLabelSchema = z.enum([
  "inventory",
  "order",
  "shipping",
  "quality",
  "customer",
  "maintenance",
]);

export const taskStatusSchema = z.enum([
  "backlog",
  "to-do",
  "in-progress",
  "done",
  "canceled",
]);

export const taskPrioritySchema = z.enum(["low", "medium", "high"]);
export const taskFieldSchema = z.enum(["label", "status", "priority"]);

export type TTaskFieldSchema = z.infer<typeof taskFieldSchema>;
export type TTaskFormSchema = z.infer<typeof taskFormSchema>;
export type TTaskEditFormSchema = z.infer<typeof taskEditFormSchema>;
