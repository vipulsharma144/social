import { Comment } from "@prisma/client";
import { getDBClient } from "../../db";
import { TResult } from "../../types";

// function to create a post
export async function createPost(
  title: string,
  content: string,
  userId: string
): Promise<TResult> {
  const client = await getDBClient();
  try {
    const result = await client.post.create({
      data: {
        title,
        content,
        author: { connect: { id: userId } },
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    const post = result;
    return { success: true, data: post };
  } catch (e: any) {
    return { success: false, error: e };
  }
}

// function to comment on a post
export async function commentOnPost(
  postId: string,
  userId: string,
  comment: string
): Promise<TResult<Comment>> {
  const client = await getDBClient();
  try {
    const result = await client.comment.create({
      data: {
        text: comment,
        post: { connect: { id: postId } },
        author: { connect: { id: userId } },
      },
    });
    const commentResult = result;
    return { success: true, data: commentResult };
  } catch (e: any) {
    return { success: false, error: e };
  }
}
