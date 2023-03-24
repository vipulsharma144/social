import { IRouterContext } from "koa-router";
import * as post from "../domain/post";
import * as list from "../domain/todo";
import markdownIt from "markdown-it";

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

export async function docs(ctx: IRouterContext) {
  const API_DOCS = `<hr /> <h2> API:/register </h2> <br />
  URL:http://159.89.55.250:3000/public/register <br />
  Method: POST <br />
  Headers: [] <br />
  Params: [] Body: {"type":"json","raw":"{ <br />
      "name":"John Doe", <br />
    "email":"hello@world.in", <br />
    "password":"Hey@123" <br />
  }",} <br />
 <br />
 <br />
 <hr /> <h2> API:/login </h2> <br />
  URL:http://localhost:3000/public/login <br />
  Method: POST <br />
  Headers: [] <br />
  Params: [] Body: {"type":"json","raw":"{ <br />
      "email":"jd_1@gmail.com", <br />
    "password":"1234567" <br />
  }",} <br />
 <br />
 <br />
 <hr /> <h2> API:/posts </h2> <br />
  URL:http://localhost:3000/posts <br />
  Method: GET <br />
  Headers: [{"name":"Authorization","value":""}] <br />
  Params: [] Body: {"type":"json","raw":"{ <br />
      "name":"John Doe", <br />
    "email":"hello@world.in", <br />
    "password":"Hey@123" <br />
  }",} <br />
 <br />
 <br />
 <hr /> <h2> API:/post </h2> <br />
  URL:http://localhost:3000/post/641d6b00e6cb003a71c4d58b <br />
  Method: GET <br />
  Headers: [{"name":"Authorization","value":""}] <br />
  Params: [] Body: {"type":"json","raw":"{ <br />
      "name":"John Doe", <br />
    "email":"hello@world.in", <br />
    "password":"Hey@123" <br />
  }",} <br />
 <br />
 <br />
 <hr /> <h2> API:/posts </h2> <br />
  URL:http://localhost:3000/posts <br />
  Method: POST <br />
  Headers: [{"name":"Authorization","value":""}] <br />
  Params: [] Body: {"type":"json","raw":"{ <br />
    "title":"Post 1", <br />
  "content":"Post 1 content" <br />
  }",} <br />
 <br />
 <br />
 <hr /> <h2> API:/comment </h2> <br />
  URL:http://localhost:3000/comment <br />
  Method: POST <br />
  Headers: [{"name":"Authorization","value":""}] <br />
  Params: [] Body: {"type":"json","raw":"{ <br />
    "postId":"641d6b00e6cb003a71c4d58b", <br />
  "comment":"Post 1 Comment" <br />
  }",} <br />
 <br />
 <br />
 <hr /> <h2> API:/todos </h2> <br />
  URL:http://localhost:3000/todos <br />
  Method: GET <br />
  Headers: [{"name":"Authorization","value":""}] <br />
  Params: [] Body: {"type":"json","raw":"{ <br />
      "name":"John Doe", <br />
    "email":"hello@world.in", <br />
    "password":"Hey@123" <br />
  }"} <br />
 <br />
 <br />
 <hr /> <h2> API:/todo </h2> <br />
  URL:http://localhost:3000/todo/641d6d87976c02a19d952c7e <br />
  Method: GET <br />
  Headers: [{"name":"Authorization","value":""}] <br />
  Params: [] <br />
 <br />
 <br />
 <hr /> <h2> API:/user </h2> <br />
  URL:http://localhost:3000/user/ <br />
  Method: GET <br />
  Headers: [{"name":"Authorization","value":""}] <br />
  Params: [] <br />
 <br />
 <br />
 <hr /> <h2> API:/todo/toggle </h2> <br />
  URL:http://localhost:3000/todo/toggle/641d6d7b976c02a19d952c7d <br />
  Method: PATCH <br />
  Headers: [{"name":"Authorization","value":""}] <br />
  Params: [] <br />
 <br />
 <br />
 <hr /> <h2> API:todo </h2> <br />
  URL:http://localhost:3000/todo <br />
  Method: POST <br />
  Headers: [{"name":"Authorization","value":""}] <br />
  Params: [] Body: {"type":"json","raw":"{ <br />
      "title":"Todo 1" <br />
  }",}`;
  const md = new markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  return (ctx.status = 200), (ctx.body = md.render(API_DOCS));
}
