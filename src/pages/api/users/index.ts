import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../user/info";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const roles = ["new", "write", "read", "admin"] as const;
export type Role = (typeof roles)[number];
export const getUserRole = (id: number) => {
  return roles[id % roles.length];
};

export const users: User[] = Array.from({ length: 150 }).map((_, id) => ({
  id,
  name: ["user", "bob", "yama"][id % 3] + id,
  email: `${["user", "bob", "yama"][id % 3]}${id}@email.jp`,
  role: getUserRole(id),
}));

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req);
  const { name = "", email = "", page = 1 } = req.query;
  const filteredUsers = users
    .filter((v) => !email || v.email.includes(email as string))
    .filter((v) => !name || v.name.includes(name as string));
  const total = filteredUsers.length;
  console.info(`name => ${name}`);
  console.info(`email => ${email}`);
  console.info(`page => ${page}`);
  return res.status(200).json({
    total,
    user_list: filteredUsers.slice((Number(page) - 1) * 50, 50 * Number(page)),
  });
};

export default handler;
