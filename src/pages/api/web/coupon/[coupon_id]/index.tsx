import { NextApiRequest, NextApiResponse } from "next";
import { coupons } from "@/pages/api/coupons";
import { getDateStatus } from "@/utils/date/getDateStatus";
import { deleteElementOfObject } from "@/utils/object/deleteElementOfObject";

/**
 * @param req
 * @param res
 */
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { coupon_id } = req.query;
  console.log(`coupon_id => ${coupon_id}`);
  const coupon = coupons.find(
    (item) => item.id.toString() == (coupon_id as string)
  );
  if (!coupon) {
    return res.status(200).json({});
  }

  // 0:利用可能, 1:利用済み, 2:期間外, 3:停止中
  const usage_status = (() => {
    // 7個に一個のクーポンを使用済みに（条件は適当）
    if (coupon.id % 7 === 0) {
      return 1;
    }
    // クーポン一覧と同じ条件でクーポンを停止中に
    if (coupon.status == 1) {
      return 3;
    }
    const isAvailable =
      coupon.status == 0 &&
      getDateStatus(new Date(), coupon.started, coupon.ended) === "within";
    if (isAvailable) {
      return 0;
    }
    return 2;
  })();

  res
    .setHeader("Access-Control-Allow-Origin", "*")
    .status(200)
    .json({
      ...deleteElementOfObject(coupon, ["pin_count", "used_count"]),
      chain_store_logo_url:
        "https://www.skylark.co.jp/site_resource/bamiyan/images/logo.svg",
      usages:
        '{"theme":{"link":"makeStyles-link-2","root":["makeStyles-root-3"]},"editorState":{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"本クーポンは","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #EB5055;","text":"その他のクーポンとの併用はできません。","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}}',
      notes:
        '{"theme":{"link":"makeStyles-link-2","root":["makeStyles-root-3"]},"editorState":{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"普通の文字","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #22198A;","text":"青文字","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #EB5055;","text":"赤文字","type":"text","version":1},{"type":"linebreak","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"テキストリンク","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":"noopener","target":null,"title":null,"url":"https://twitter.com"}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"「","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #22198A;","text":"あなた","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"の逃げ場はもうないん","type":"text","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ですよ。","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":"noopener","target":null,"title":null,"url":"https://twitter.com/i/status/1669975132109156354"},{"detail":0,"format":0,"mode":"normal","style":"","text":"崖の先にはただの深淵が広がっています。このまま進めば絶望的な結末を迎えるだけです。でも、まだ選択の余地はあります。あなたの人生を変える最後の","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #EB5055;","text":"チャンス","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"です。立ち止まって、考え直してください。罪を償い、新しい道を歩むこともできます。自分を見失わないでください。選んだ道が将来にどのような影響を及ぼすか、真剣に考えてください。もしも今この場で折れる勇気を持てないのなら、一生後悔することになります。踏み出す前に","type":"text","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"、","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":"noopener","target":null,"title":null,"url":"https://www.google.com"},{"detail":0,"format":0,"mode":"normal","style":"color: #22198A;","text":"最","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #EB5055;","text":"後","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"の瞬間に立ち返ることができるなら、今がその時です。」","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}}',
      pin: "12345678901234567890123456789012345",
      usage_status,
    });
};

export default handler;
