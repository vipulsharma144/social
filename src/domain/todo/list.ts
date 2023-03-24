import { Todo } from "@prisma/client";
import { getDBClient } from "../../db";
import { TResult } from "../../types";

//get all todos of the user
export async function getUserTodos(userId: string): Promise<TResult<Todo[]>> {
  const client = await getDBClient();
  try {
    const todos = await client.todo.findMany({
      where: {
        userId: userId,
      },
    });
    return { success: true, data: todos };
  } catch (e: any) {
    return { success: false, error: e };
  }
}

//get todo by id
export async function getTodo(
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
    return { success: true, data: todo };
  } catch (e: any) {
    return { success: false, error: e };
  }
}
