import { CouponTextHelper } from "../CouponTextSchemaHelper";
import { SearchSchema } from "@/components/common/SearchPanel/types";
import { createApiPath } from "@/utils/url/createApiPath";

export const couponSearchSchema: SearchSchema = [
  { label: "キャンペーンID", type: "text", key: "campaign_id" },
  {
    type: "autoComplete",
    label: "チェーン店名",
    apiPath: createApiPath("/chain_stores"),
    dataKey: "chain_store_name_list",
    key: "chain_store_name",
  },
  {
    type: "text",
    label: "クーポン画像下テキスト",
    key: "coupon_text",
    helperComponent: <CouponTextHelper />,
  },
];
