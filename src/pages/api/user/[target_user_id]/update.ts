import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../info";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req, ["read", "write"]);
  const { target_user_id } = req.query;
  console.log(`update user id => ${target_user_id}`);
  if (req.method !== "POST") {
    return res.status(406).send("");
  }
  res.status(200).send("");
};

export default handler;
