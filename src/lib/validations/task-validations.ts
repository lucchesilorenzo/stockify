import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required.").max(50, "Title is too long."),
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

export type TTaskFormSchema = z.infer<typeof taskFormSchema>;
