import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../user/info";

const csvData = [
  ["Name", "Age", "Gender"],
  ["Alice", "25", "Female"],
  ["Bob", "30", "Male"],
  ["Charlie", "35", "Male"],
];

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req, ["read"]);
  const { coupon_id, verify } = req.query;
  console.log(`coupon_id => ${coupon_id}`);
  console.log(`verify => ${verify}`);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=coupon_${coupon_id}_${
      verify === "1" ? "kensyo" : "haisin"
    }.csv`
  );
  const csvString = csvData.map((row) => row.join(",")).join("\n");
  res.status(200).send(csvString);
};

export default handler;
