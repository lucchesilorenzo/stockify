import prisma from "../db";

export async function getTasks() {
  const tasks = await prisma.task.findMany();

  return tasks;
}
