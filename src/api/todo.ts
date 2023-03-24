import { IRouterContext } from "koa-router";
import * as todo from "../domain/todo";
import { isValidObjectId } from "../utils/helper";

//get todo by id
export async function getTodo(ctx: IRouterContext) {
  const { id } = ctx.params;
  if (!id || !isValidObjectId(id))
    return (
      (ctx.status = 400),
      (ctx.body = { error: "Invalid arguments , provide todo ID " })
    );

  const result = await todo.getTodo(id, ctx.state.user.id);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

// get All Todos
export async function getTodos(ctx: IRouterContext) {
  const result = await todo.getUserTodos(ctx.state.user.id);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

//update todo
export async function updateTodo(ctx: IRouterContext) {
  const { id } = ctx.params;
  const { title, content } = ctx.request.body;
  if (!id || !title || !content)
    return (
      (ctx.status = 400),
      (ctx.body = {
        error: "Invalid arguments , provide todo ID and title and content",
      })
    );

  const result = await todo.updateTodo(id, title, ctx.state.user.id);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

//toggle todo
export async function toggleTodo(ctx: IRouterContext) {
  const { id } = ctx.params;
  if (!id)
    return (
      (ctx.status = 400),
      (ctx.body = { error: "Invalid arguments , provide todo ID " })
    );

  const result = await todo.toggleTodo(id, ctx.state.user.id);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

//create todo
export async function createTodo(ctx: IRouterContext) {
  const { title } = ctx.request.body;
  if (!title)
    return (
      (ctx.status = 400),
      (ctx.body = { error: "Invalid arguments , provide title" })
    );

  const result = await todo.createTodo(title, ctx.state.user.id);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

//delete todo
export async function deleteTodo(ctx: IRouterContext) {
  const { id } = ctx.params;
  if (!id)
    return (
      (ctx.status = 400),
      (ctx.body = { error: "Invalid arguments , provide todo ID " })
    );

  const result = await todo.deleteTodo(id, ctx.state.user.id);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}
