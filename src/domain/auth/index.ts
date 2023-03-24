import { getDBClient } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TResult } from "../../types";
import { User } from "@prisma/client";

//function to login user
export async function login(email: string, password: string) {
  const client = await getDBClient();
  try {
    const user = await client.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) return { success: false, status: 404 };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { success: false, status: 401 };
    const token = await generateToken(user);
    return { success: true, data: { token, user } };
  } catch (e: any) {
    return { success: false, error: e };
  }
}

//function to register user
type TUserDetails = { email: string; id: string; name: string | null };
type TUserResult = TResult<{ user: TUserDetails } & { token: string }>;
export async function register(
  name: string,
  email: string,
  password: string
): Promise<TUserResult> {
  const client = await getDBClient();
  try {
    const userExists = await checkUser(email);
    if (userExists.success)
      return {
        success: false,
        status: 400,
        error: "User Already exists, please choose a different email",
      };
    const user: TUserDetails = await client.user.create({
      select: {
        id: true,
        name: true,
        email: true,
      },
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      },
    });
    if (!user) return { success: false, status: 404 };

    const token = await generateToken(user);
    return { success: true, data: { user, token } };
  } catch (e: any) {
    return { success: false, error: e, status: 400 };
  }
}

//function to generate token
export async function generateToken(user: any) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not defined");
  const token = await jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
}

//function to check if user exists in db
export async function checkUser(email: string) {
  const client = await getDBClient();
  try {
    const user = await client.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) return { success: false, status: 404 };
    return { success: true, data: user };
  } catch (e: any) {
    return { success: false, error: e };
  }
}
