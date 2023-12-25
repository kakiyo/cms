import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../info";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req, ["read", "write"]);
  const { target_user_id } = req.query;
  console.log(`delete user id => ${target_user_id}`);
  await new Promise((resolver) => setTimeout(resolver, 2000));
  if (req.method !== "POST") {
    return res.status(406).send("");
  }
  res.status(200).send("");
};

export default handler;
