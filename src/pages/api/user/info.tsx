import { NextApiRequest, NextApiResponse } from "next";
import { getUserRole, users, Role } from "../users";

export const checkAuth = (
  res: NextApiResponse,
  req: NextApiRequest,
  roles: Exclude<Role, "new">[] = []
) => {
  const userId = req.cookies.user_id;
  const role = getUserRole(Number(userId));
  // newは絶対拒否
  const deniedRoles: Role[] = [...roles, "new"];
  if (!userId || deniedRoles.includes(role)) {
    return res
      .status(401)
      .json({ message: `userID: ${userId} は不正なユーザーな気がします` });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.cookies.user_id;
  const { name, email } = req.query;
  const page = Number.isNaN(Number(req.query.page))
    ? 1
    : Number(req.query.page);
  console.info(`name => ${name}`);
  console.info(`email => ${email}`);
  console.info(`page => ${page}`);
  checkAuth(res, req);
  const user = users.find((user) => user.id.toString() === userId);

  res.status(200).json(user);
};

export default handler;
