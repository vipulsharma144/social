// function to login user
import { IRouterContext } from "koa-router";
import * as auth from "../domain/auth";
export async function login(ctx: IRouterContext) {
  const { email, password } = ctx.request.body;
  if (!email || !password)
    return (
      (ctx.status = 400),
      (ctx.body = { error: "Invalid arguments , provide email and password" })
    );

  const result = await auth.login(email, password);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}

//function to register user
export async function register(ctx: IRouterContext) {
  const { name, email, password } = ctx.request.body;
  if (!name || !email || !password)
    return (
      (ctx.status = 400),
      (ctx.body = {
        error: "Invalid arguments , provide name , email and password",
      })
    );

  const result = await auth.register(name, email, password);
  if (!result.success)
    return (ctx.status = result.status || 500), (ctx.body = result);

  return (ctx.status = 200), (ctx.body = result.data);
}
