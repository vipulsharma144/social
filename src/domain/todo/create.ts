import { getDBClient } from "../../db";
import { TResult } from "../../types";
export async function createTodo(
  title: string,
  userId: string
): Promise<TResult> {
  const client = await getDBClient();
  try {
    const result = await client.todo.create({
      data: {
        title,
        owner: { connect: { id: userId } },
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    const todo = result;
    return { success: true, data: todo };
  } catch (e: any) {
    return { success: false, error: e };
  }
}
