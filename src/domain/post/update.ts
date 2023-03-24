import { Comment } from "@prisma/client";
import { getDBClient } from "../../db";
import { TResult } from "../../types";

// function to update a post
export async function updatePost(
  id: string,
  title: string,
  content: string,
  userId: string
): Promise<TResult> {
  const client = await getDBClient();
  try {
    const post = await client.post.findFirst({
      where: {
        id,
        author: {
          id: userId,
        },
      },
    });
    if (!post) return { success: false, status: 404 };

    const result = await client.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
    if (!result) return { success: false, status: 404 };
    const postEdited = result;
    return { success: true, data: postEdited };
  } catch (e: any) {
    return { success: false, error: e };
  }
}
