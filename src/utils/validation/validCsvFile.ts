import { createApiPath } from "../url/createApiPath";
import { AsyncValid } from "./types";
import { axiosClient } from "@/provider/QueryClientProvider";

type Option = {
  couponName: string;
  couponId: string;
} | null;
export const validCsvFile: AsyncValid<File, Option> = async (csv, option) => {
  // pinがundefinedの場合はチェックしない
  if (!csv) {
    return;
  }

  const params = new FormData();
  params.append("pin_file", csv);
  if (option) {
    params.append("coupon_id", option.couponId);
  }
  const result = await axiosClient
    .post(createApiPath("check_csv"), params, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then(() => ({ message: "ok" }))
    .catch((e) => ({ message: e.response.data.Message as string }));
  if (option && result.message.includes(option.couponName)) {
    return true;
  }
  return (
    result.message === "ok" || result.message || "不明なエラーが発生しました"
  );
};
