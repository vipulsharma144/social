# CUTSHORT Assignment 1

## Introduction

This is a nodejs Backedn app with a REST API for a social app that can create todo list and posts . Users can also comment on posts.

## Tech Stack

1. Nodejs
2. Koa
3. Prisma
4. MongoDb

## MongoDB on local

Make sure the mongo is started in replica mode follow this tutorial for it (https://docs.mongodb.com/manual/tutorial/deploy-replica-set/)[https://docs.mongodb.com/manual/tutorial/deploy-replica-set/] and make sure the mongo is running and the DATABASE_URL is passed to the .env file

## Installation

1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Run `npx prisma generate` to generate the prisma client
4. Run `npx prisma db push` to create the database
5. Run `npx prisma db seed` to seed the database
6. Run `npm run dev` to start the server in development mode
7. Run `npm run start` to start the server
8. Run `npm run test` to run the tests

## API Documentation

### API:/register

URL:http://159.89.55.250:3000/public/register
Method: POST
Headers: []
Params: [] Body: {"type":"json","raw":"{
"name":"John Doe",
"email":"hello@world.in",
"password":"Hey@123"
}"}

<hr />
### API:/login
 URL:http://localhost:3000/public/login 
 Method: POST 
 Headers: [] 
 Params: [] Body: {"type":"json","raw":"{
     "email":"jd_1@gmail.com",
   "password":"1234567"
 }"}

<hr />
### API:/posts
 URL:http://localhost:3000/posts 
 Method: GET 
 Headers: [{"name":"Authorization","value":""}] 
 Params: [] Body: {"type":"json","raw":"{
     "name":"John Doe",
   "email":"hello@world.in",
   "password":"Hey@123"
 }"}

<hr />
### API:/post
 URL:http://localhost:3000/post/641d6b00e6cb003a71c4d58b 
 Method: GET 
 Headers: [{"name":"Authorization","value":""}] 
 Params: [] Body: {"type":"json","raw":"{
     "name":"John Doe",
   "email":"hello@world.in",
   "password":"Hey@123"
 }"}

<hr />
### API:/posts
 URL:http://localhost:3000/posts 
 Method: POST 
 Headers: [{"name":"Authorization","value":""}] 
 Params: [] Body: {"type":"json","raw":"{
   "title":"Post 1",
 "content":"Post 1 content"
 }"}

<hr />
### API:/comment
 URL:http://localhost:3000/comment 
 Method: POST 
 Headers: [{"name":"Authorization","value":""}] 
 Params: [] Body: {"type":"json","raw":"{
   "postId":"641d6b00e6cb003a71c4d58b",
 "comment":"Post 1 Comment"
 }"}

<hr />
### API:/todos
 URL:http://localhost:3000/todos 
 Method: GET 
 Headers: [{"name":"Authorization","value":""}] 
 Params: [] Body: {"type":"json","raw":"{
     "name":"John Doe",
   "email":"hello@world.in",
   "password":"Hey@123"
 }"}

<hr />
### API:/todo
 URL:http://localhost:3000/todo/641d6d87976c02a19d952c7e 
 Method: GET 
 Headers: [{"name":"Authorization","value":""}] 
 Params: []

<hr />
### API:/user
 URL:http://localhost:3000/user/ 
 Method: GET 
 Headers: [{"name":"Authorization","value":""}] 
 Params: []

<hr />
### API:/todo/toggle
 URL:http://localhost:3000/todo/toggle/641d6d7b976c02a19d952c7d 
 Method: PATCH 
 Headers: [{"name":"Authorization","value":""}] 
 Params: []

<hr />
### API:todo
 URL:http://localhost:3000/todo 
 Method: POST 
 Headers: [{"name":"Authorization","value":""}] 
 Params: [] Body: {"type":"json","raw":"{
     "title":"Todo 1"
 
 }"}
