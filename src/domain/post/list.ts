import { getDBClient } from "../../db";
import { TResult } from "../../types";
import { Post } from "@prisma/client";

//get all posts of the user
export async function getUserPosts(userId: string): Promise<TResult<any[]>> {
  const client = await getDBClient();
  try {
    const posts = await client.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        comments: true,
      },
    });
    return { success: true, data: posts };
  } catch (e: any) {
    return { success: false, error: e };
  }
}

// get all posts by all users
export async function getAllPosts(
  page: number = 0,
  perPage: number = 10
): Promise<TResult<Post[]>> {
  const client = await getDBClient();
  try {
    const posts = await client.post.findMany({
      where: {
        published: true,
      },
      skip: page * perPage,
      take: perPage,
    });
    if (!posts) return { success: false, status: 404 };
    return { success: true, data: posts };
  } catch (e: any) {
    return { success: false, error: e };
  }
}

//get post by id
export async function getPost(id: string): Promise<TResult<Post>> {
  const client = await getDBClient();
  try {
    const post = await client.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) return { success: false, status: 404, error: "Post not found" };
    return { success: true, data: post };
  } catch (e: any) {
    return { success: false, error: e };
  }
}
