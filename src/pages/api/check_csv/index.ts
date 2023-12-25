import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../user/info";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req);
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { pin_file, coupon_id } = req.body;
  console.info(`csvfile is ${pin_file}`);
  console.info(`coupon_id is ${coupon_id}`);
  // res.status(406).json({ message: ["no"] });
  res.status(200).send("");
};

export default handler;
