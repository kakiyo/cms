import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Set-Cookie", "user_id=; path=/");
  res.redirect("/login");
};

export default handler;
