import { IRouterContext } from "koa-router";
import * as post from "../domain/post";
import { isValidObjectId } from "../utils/helper";

export async function getUsersPosts(ctx: IRouterContext) {
  const result = await post.getUserPosts(ctx.state.user.id);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

// get All Posts of all users
export async function getAllPosts(ctx: IRouterContext) {
  const result = await post.getAllPosts();
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

// get post by id
export async function getPost(ctx: IRouterContext) {
  const { id } = ctx.params;

  if (!id || !isValidObjectId(id))
    return (
      (ctx.status = 400),
      (ctx.body = { error: "Invalid arguments , provide valid post ID " })
    );

  const result = await post.getPost(id);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

//update post
export async function updatePost(ctx: IRouterContext) {
  const { title, content, postId } = ctx.request.body;
  if (!postId || !title || !content)
    return (
      (ctx.status = 400),
      (ctx.body = {
        error: "Invalid arguments , provide post ID and title and content",
      })
    );

  const result = await post.updatePost(
    postId,
    title,
    content,
    ctx.state.user.id
  );
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

//create post
export async function createPost(ctx: IRouterContext) {
  const { title, content } = ctx.request.body;
  if (!title || !content)
    return (
      (ctx.status = 400),
      (ctx.body = { error: "Invalid arguments , provide title and content" })
    );

  const result = await post.createPost(title, content, ctx.state.user.id);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

//comment on post
export async function commentOnPost(ctx: IRouterContext) {
  const { comment, postId } = ctx.request.body;
  if (!postId || !comment)
    return (
      (ctx.status = 400),
      (ctx.body = {
        error: "Invalid arguments , provide post ID and comment",
      })
    );

  const result = await post.commentOnPost(postId, ctx.state.user.id, comment);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}
