import { Schema } from "../../common/Form/FormGenerator/types";

export const detailSchema: Schema = {
  formSchema: [
    {
      name: "campaign_id",
      inputType: "TextField",
      label: "キャンペーンID",
    },
    {
      name: "chain_store_name",
      inputType: "TextField",
      label: "チェーン店名",
    },
    {
      name: "chain_store_logo",
      inputType: "ImgUploader",
      label: "チェーン店ロゴ画像",
    },
    {
      name: "pin_file_name",
      inputType: "TextField",
      label: "PINファイル",
    },
    {
      name: "coupon_img_1",
      inputType: "ImgUploader",
      label: "クーポン画像1",
    },
    {
      name: "coupon_img_2",
      inputType: "ImgUploader",
      label: "クーポン画像2",
    },
    {
      name: "coupon_img_3",
      inputType: "ImgUploader",
      label: "クーポン画像3",
    },
    {
      name: "coupon_img_4",
      inputType: "ImgUploader",
      label: "クーポン画像4",
    },
    {
      name: "coupon_img_5",
      inputType: "ImgUploader",
      label: "クーポン画像5",
    },
    {
      name: "coupon_text",
      inputType: "RichText",
      label: "クーポン画像下テキスト",
    },
    {
      name: "started",
      inputType: "DateTimeRangePicker",
      label: "利用期間",
    },
    {
      name: "ended",
      inputType: "DateTimeRangePickerEnd",
      label: "",
    },
    {
      name: "usages",
      inputType: "RichText",
      label: "利用方法",
    },
    {
      name: "notes",
      inputType: "RichText",
      label: "注意事項",
    },
    {
      name: "status",
      inputType: "Select",
      label: "ステータス",
      list: [
        {
          label: "公開",
          value: "0",
          color: (theme) => theme.palette.couponStatus.open,
        },
        {
          label: "公開停止",
          value: "1",
          color: (theme) => theme.palette.couponStatus.stop,
        },
        {
          label: "削除済み",
          value: "2",
          color: (theme) => theme.palette.couponStatus.deleted,
        },
      ],
    },
  ],
};
