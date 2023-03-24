import { PrismaClient } from "@prisma/client";
import { todos, users, posts, comments } from "./data";
const prisma = new PrismaClient();

// generate random mongoDB key

const load = async () => {
  try {
    await prisma.user.createMany({
      data: users,
    });
    console.log("Added users data");

    await prisma.post.createMany({
      data: posts,
    });
    console.log("Added category posts");

    await prisma.todo.createMany({
      data: todos,
    });

    await prisma.comment.createMany({
      data: comments,
    });
    console.log("Added category TODO");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};
load();
