export const taskStructure = `
Each task should have the following structure:
[
  {
    "title": "Task Title",
    "status": "backlog" | "to-do" | "in-progress" | "done" | "canceled",
    "priority": "low" | "medium" | "high",
    "label": "inventory" | "order" | "shipping" | "quality" | "customer" | "maintenance",
    "dueDate": "2024-11-23T12:00:00",
    "userId": session.user.id
  }
]
`;

export const exampleOutput = `
Here is an example of the expected output:
[
  {
    "title": "Restock inventory",
    "status": "to-do",
    "priority": "high",
    "label": "inventory",
    "dueDate": "2024-11-30T09:00:00",
    "userId": session.user.id
  },
  {
    "title": "Ship order #1234",
    "status": "in-progress",
    "priority": "medium",
    "label": "shipping",
    "dueDate": "2024-11-25T12:00:00",
    "userId": session.user.id
  },
]
`;
