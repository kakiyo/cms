import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../../user/info";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req, ["read", "write"]);
  const { coupon_id } = req.query;
  console.info(`coupon_id is ${coupon_id}`);

  await new Promise((resolver) => setTimeout(resolver, 2000));
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  res.status(200).json({
    status: "ok",
  });
};

export default handler;
