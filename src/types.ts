import { User } from "@prisma/client";

export type TTodo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: TUser;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TToken = {
  token: string;
  user: User;
  expiresAt: Date;
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  owner: TUser;
};

export type TComment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  owner: TUser;
  post: TPost;
};

export type TResult<T = any> = {
  success: boolean;
  data?: T;
  error?: any;
  status?: number;
};
