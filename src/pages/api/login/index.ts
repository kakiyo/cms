import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * 0 => new
   * 1 => write
   * 2 => read
   * 3 => admin
   */
  const userId = "3";
  res.setHeader("Set-Cookie", `user_id=${userId}; path=/`);
  res.redirect("/");
};

export default handler;
