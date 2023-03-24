#!/usr/bin/env node
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router, { IRouterContext } from "koa-router";
import cors from "@koa/cors";
// import * as broker from '@univ-ai/brokered-tasks';
import { join } from "path";
const helmet = require("koa-helmet");
import session from "koa-session";
import * as db from "./db";
import * as posts from "./api/post";
import * as todos from "./api/todo";
import * as auth from "./api/auth";
import * as user from "./api/user";
import jwt from "koa-jwt";
import { auth as authMiddleware } from "./middleware/auth";
import { SHA256 } from "crypto-js";
import dotenv from "dotenv";
import ratelimit from "koa-ratelimit";

export async function init() {
  const router = new Router();
  dotenv.config();
  const CONFIG = {
    key: "social.session" /** (string) cookie key (default is koa.sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit:
      true /** (boolean) automatically commit headers (default true) */,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    rolling:
      false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
    renew:
      false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
    secure: true /** (boolean) secure cookie*/,
  };
  if (!process.env.JWT_SECRET) {
    console.log("Please provide JWT secret");
    process.exit(1);
  }

  // Start app
  const app = new Koa();
  db.init();
  app.use(
    ratelimit({
      driver: "memory",
      db: new Map(), // can use persistent db too
      duration: 60000,
      errorMessage: "Slow Down Eh !!.",
      id: (ctx) => ctx.ip,
      headers: {
        remaining: "Rate-Limit-Remaining",
        reset: "Rate-Limit-Reset",
        total: "Rate-Limit-Total",
      },
      max: 10,
      disableHeader: false,
      whitelist: (ctx) => {
        if (
          process.env.whitelistIPs &&
          process.env.whitelistIPs.split(",").includes(ctx.ip)
        ) {
          return true;
        } else {
          return false;
        }
      },
      blacklist: (ctx) => {
        if (
          process.env.blacklistIPs &&
          process.env.blacklistIPs.split(",").includes(ctx.ip)
        ) {
          return true;
        } else {
          return false;
        }
      },
    })
  );
  app.use(helmet());
  app.use(cors({ credentials: true }));
  app.proxy = true;
  app.use(bodyParser());
  app.use(
    jwt({
      secret: process.env.JWT_SECRET,
    }).unless({ path: [/^\/public/] })
  );
  app.use(session(CONFIG, app));
  app.use(authMiddleware);
  app.use(router.routes());
  app.use(router.allowedMethods());

  router.post("/public/login", auth.login);
  router.post("/public/register", auth.register);

  router.get("/posts", posts.getUsersPosts);
  router.get("/post/:id", posts.getPost);
  router.post("/post", posts.createPost);

  router.get("/todos", todos.getTodos);
  router.get("/todo/:id", todos.getTodo);
  router.patch("/todo", todos.updateTodo);
  router.patch("/todo/toggle/:id", todos.toggleTodo);
  router.post("/todo", todos.createTodo);
  router.delete("/todo", todos.deleteTodo);

  router.post("/comment", posts.commentOnPost);
  router.get("/user", user.getMyPostsAndTodos);
  router.get("/user/:id", user.getPostsAndTodos);
  return app;
}

if (require.main === module) {
  init().then((app) => {
    app.listen(process.env.PORT || 3030);
    console.log(`listening on port ${process.env.PORT || 3030}`);
  });
}
