import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../user/info";

export const chain_stores = [
  "バーミヤン1",
  "バーミヤン2",
  "バーミヤン3",
  "バーミヤン4",
  "バーミヤン5",
  "バーミヤン6",
  "バーミヤン7",
];

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req);
  res.status(200).json({
    chain_store_name_list: chain_stores,
  });
};

export default handler;
