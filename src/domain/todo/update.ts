import { Todo } from "@prisma/client";
import { getDBClient } from "../../db";
import { TResult } from "../../types";

//toggle todo completed
export async function toggleTodo(
  id: string,
  userId: string
): Promise<TResult<Todo>> {
  const client = await getDBClient();
  try {
    const todo = await client.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!todo) return { success: false, status: 404 };
    const result = await client.todo.update({
      where: {
        id,
      },
      data: {
        completed: !todo.completed,
        updatedAt: new Date(),
      },
    });
    return { success: true, data: result };
  } catch (e: any) {
    return { success: false, error: e };
  }
}

//update todo
export async function updateTodo(
  id: string,
  title: string,
  userId: string
): Promise<TResult<Todo>> {
  const client = await getDBClient();
  try {
    const todo = await client.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!todo) return { success: false, status: 404 };
    const result = await client.todo.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return { success: true, data: result };
  } catch (e: any) {
    return { success: false, error: e };
  }
}
