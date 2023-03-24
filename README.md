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
8. Run `npm jest` to run the tests
