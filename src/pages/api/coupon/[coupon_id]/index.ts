import { NextApiRequest, NextApiResponse } from "next";
import { coupons } from "../../coupons";
import { checkAuth } from "../../user/info";
import { deleteElementOfObject } from "@/utils/object/deleteElementOfObject";
import { createApiPath } from "@/utils/url/createApiPath";

/**
 * @param req
 * @param res
 */
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  checkAuth(res, req);
  const { coupon_id } = req.query;
  console.log(`coupon_id => ${coupon_id}`);

  res.status(200).json(
    deleteElementOfObject(
      {
        ...coupons.filter((item) => item.id.toString() == coupon_id)[0],
        usages:
          '{"theme":{"link":"makeStyles-link-2","root":["makeStyles-root-3"]},"editorState":{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"本クーポンは","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #EB5055;","text":"その他のクーポンとの併用はできません。","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}}',
        notes:
          '{"theme":{"link":"makeStyles-link-2","root":["makeStyles-root-3"]},"editorState":{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"普通の文字","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #22198A;","text":"青文字","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #EB5055;","text":"赤文字","type":"text","version":1},{"type":"linebreak","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"テキストリンク","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":"noopener","target":null,"title":null,"url":"https://twitter.com"}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"「","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #22198A;","text":"あ","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"注意事項","type":"text","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"リンクですよ。","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":"noopener","target":null,"title":null,"url":"https://twitter.com/i/status/1669975132109156354"},{"detail":0,"format":0,"mode":"normal","style":"","text":"注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #EB5055;","text":"赤い","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項注意事項","type":"text","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"、","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":"noopener","target":null,"title":null,"url":"https://www.google.com"},{"detail":0,"format":0,"mode":"normal","style":"color: #22198A;","text":"最","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #EB5055;","text":"赤","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"注意","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}}',
        chain_store_logo: createApiPath("resource?id=1"),
        // 横長
        coupon_img_1:
          coupons[
            coupons.findIndex((item) => item.id.toString() === coupon_id)
          ].img_url_list.at(0) ?? "",
        // 縦長
        coupon_img_2:
          coupons[
            coupons.findIndex((item) => item.id.toString() === coupon_id)
          ].img_url_list.at(1) ?? "",
        // 正方形に近い
        coupon_img_3:
          coupons[
            coupons.findIndex((item) => item.id.toString() === coupon_id)
          ].img_url_list.at(2) ?? "",
        coupon_img_4:
          coupons[
            coupons.findIndex((item) => item.id.toString() === coupon_id)
          ].img_url_list.at(3) ?? "",
        coupon_img_5:
          coupons[
            coupons.findIndex((item) => item.id.toString() === coupon_id)
          ].img_url_list.at(4) ?? "",
        pin_file_name: "coupon_pin.csv",
        created: "2023-03-22T10:00:00+09:00",
        created_by_name: "テストユーザ1",
        created_by_mail: "yamada_taro_1@company.jp",
        // updated: new Date().getTime(),
        updated: "2023-03-22T10:00:00+09:00",
        updated_by_name: "テストユーザ1",
        updated_by_mail: "yamada_taro_1@company.jp",
        csv_dl_list: [
          {
            dl_datetime: "2023-03-22T13:00:00+09:00",
            name: "テストユーザ",
            email: "user@company.jp",
          },
          {
            dl_datetime: "2023-03-11T13:34:56+09:00",
            name: "授人以魚不如授人以漁",
            email: "user@company.jp",
          },
        ],
        regist_status: Number(coupon_id) % 3,
      },
      ["img_url_list"]
    )
  );
};

export default handler;
