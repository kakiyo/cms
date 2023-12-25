import { NextApiRequest, NextApiResponse } from "next";
import { chain_stores } from "../chain_stores";
import { checkAuth } from "../user/info";
import { createApiPath } from "@/utils/url/createApiPath";

const periodList = [
  {
    started: "2023-03-23T10:00:00+09:00",
    ended: "2023-03-31T23:59:59+09:00",
  },
  {
    started: "2024-03-23T10:00:00+09:00",
    ended: "2024-03-31T23:59:59+09:00",
  },
  {
    started: "2023-03-23T10:00:00+09:00",
    ended: "2024-03-31T23:59:59+09:00",
  },
  {
    started: "2023-03-23T10:00:00+09:00",
    ended: "2023-03-31T23:59:59+09:00",
  },
  {
    started: "2023-03-23T10:00:00+09:00",
    ended: "2023-03-31T23:59:59+09:00",
  },
];

export const coupons = Array.from({ length: 150 }).map((_, id) => ({
  id,
  campaign_id: Array.from({ length: 10 })
    .map((_) => id)
    .join()
    .replaceAll(",", "")
    .slice(0, 6),
  chain_store_name: chain_stores[id % chain_stores.length],
  coupon_text: `{"theme":{"link":"makeStyles-link-2","root":["makeStyles-root-3"]},"editorState":{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"全品","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #22198A;","text":"${id}%","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"オフ！！！","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"過去","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #EB5055;","text":"最高","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"のコストパフォーマンス！！！","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}}`,
  started: periodList[Number(id) % periodList.length].started,
  ended: periodList[Number(id) % periodList.length].ended,
  img_url_list: [
    createApiPath("resource?id=2"),
    createApiPath("resource?id=2"),
    createApiPath("resource?id=2"),
    createApiPath("resource?id=2"),
    createApiPath("resource?id=2"),
  ].slice(0, (id % 5) + 1),
  pin_count: 100000,
  used_count: 0,
  status: id % 3,
}));

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req);
  const {
    chain_store_name = "",
    coupon_text = "",
    campaign_id = "",
    page = 1,
  } = req.query;
  const queryClientName = decodeURI(chain_store_name as string);
  const queryCouponName = decodeURI(coupon_text as string);
  const queryPage = Number(page);
  console.info(`page is ${queryPage}`);
  console.info(`chain_store_name is ${queryClientName}`);
  console.info(`coupon_text is ${queryCouponName}`);
  console.info(`coupon_text is ${campaign_id}`);

  const filteredCoupons = coupons
    .filter(
      (v) => !queryClientName || v.chain_store_name.includes(queryClientName)
    )
    .filter((v) => !queryCouponName || v.coupon_text.includes(queryCouponName))
    .filter(
      (v) => !campaign_id || v.campaign_id.includes(campaign_id as string)
    );

  res.status(200).json({
    total: filteredCoupons.length,
    coupon_list: filteredCoupons.slice((queryPage - 1) * 50, 50 * queryPage),
  });
};

export default handler;
