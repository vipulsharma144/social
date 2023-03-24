import { Todo } from "@prisma/client";
import { getDBClient } from "../../db";
import { TResult } from "../../types";

//delete todo
export async function deleteTodo(
  id: string,
  userId: string
): Promise<TResult<Todo>> {
  const client = await getDBClient();
  try {
    const todo = await client.todo.findFirst({
      where: {
        id,
        owner: {
          id: userId,
        },
      },
    });
    if (!todo) return { success: false, status: 404 };
    const result = await client.todo.delete({
      where: {
        id,
      },
    });
    return { success: true, data: result };
  } catch (e: any) {
    return { success: false, error: e };
  }
}
