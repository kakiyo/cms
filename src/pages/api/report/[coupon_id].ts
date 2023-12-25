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
  const { coupon_id } = req.query;
  console.log(`coupon_id => ${coupon_id}`);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=report_${coupon_id}.csv`
  );
  const csvString = csvData.map((row) => row.join(",")).join("\n");
  res.status(200).send(csvString);
};

export default handler;
