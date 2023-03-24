import { ObjectId } from "bson";
import bcrypt from "bcrypt";
const generateMongoId = () => {
  return new ObjectId().toString();
};

const uid1 = generateMongoId();
const uid2 = generateMongoId();

const pid1 = generateMongoId();
const pid2 = generateMongoId();
const defPass = "123456";
export const users = [
  {
    name: "John Doe",
    email: "jd_1@gmail.com",
    password: bcrypt.hashSync(defPass, 10),
    id: uid1,
  },
  {
    name: "Jane Doe 2",
    email: "jd_2@gmailcom",
    password: bcrypt.hashSync(defPass, 10),
    id: uid2,
  },
];

export const posts = [
  {
    title: "My first post",
    content: "This is my first post",
    published: true,
    authorId: uid1,
    id: pid1,
  },
  {
    title: "My second post",
    content: "This is my second post",
    published: true,
    authorId: uid2,
    id: pid2,
  },
];

export const comments = [
  {
    text: "This is my first comment",
    postId: pid1,
    authorId: uid1,
  },
  {
    text: "This is my second comment",
    postId: pid1,
    authorId: uid1,
  },
];

export const todos = [
  {
    title: "My first todo",
    userId: uid1,
    completed: false,
  },
  {
    title: "My second todo",
    userId: uid2,
    completed: false,
  },
];
