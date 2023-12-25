import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../../user/info";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req, ["read"]);
  const {
    chain_store_name,
    name,
    started,
    ended,
    usages,
    notes,
    chain_store_logo,
    coupon_img_1,
    coupon_img_2,
    coupon_img_3,
    coupon_img_4,
    coupon_img_5,
    pin_file,
    status,
  } = req.body;
  console.info(`chain_store_name is ${chain_store_name}`);
  console.info(`name is ${name}`);
  console.info(`started is ${started}`);
  console.info(`ended is ${ended}`);
  console.info(`usages is ${usages}`);
  console.info(`notes is ${notes}`);
  console.info(`chain_store_logo is ${chain_store_logo}`);
  console.info(`coupon_img_1 is ${coupon_img_1}`);
  console.info(`coupon_img_2 is ${coupon_img_2}`);
  console.info(`coupon_img_3 is ${coupon_img_3}`);
  console.info(`coupon_img_4 is ${coupon_img_4}`);
  console.info(`coupon_img_5 is ${coupon_img_5}`);
  console.info(`pin_file is ${pin_file}`);
  console.info(`status is ${status}`);

  await new Promise((resolver) => setTimeout(resolver, 2000));
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  res.status(200).json({
    status: "ok",
  });
};

export default handler;
