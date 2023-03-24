import { IRouterContext } from "koa-router";
import * as post from "../domain/post";
import * as list from "../domain/todo";

//function to get user posts and todos
export async function getMyPostsAndTodos(ctx: IRouterContext) {
  const { id } = ctx.state.user;
  const [posts, todos] = await Promise.all([
    post.getUserPosts(id),
    list.getUserTodos(id),
  ]);
  return (ctx.status = 200), (ctx.body = { posts, todos });
}

// get post and todos of other user
export async function getPostsAndTodos(ctx: IRouterContext) {
  const { userId } = ctx.params;
  const [posts, todos] = await Promise.all([
    post.getUserPosts(userId),
    list.getUserTodos(userId),
  ]);
  return (ctx.status = 200), (ctx.body = { posts, todos });
}
