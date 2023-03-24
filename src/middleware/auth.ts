import { IRouterContext } from "koa-router";

//middleware to check if user is authenticated via jwt token
export async function auth(ctx: IRouterContext, next: () => Promise<any>) {
  // any authenticated user can access this route

  await next();
}
