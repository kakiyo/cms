import { Schema } from "../../common/Form/FormGenerator/types";
import { validCsvFile } from "@/utils/validation/validCsvFile";
import { validEmptyRichText } from "@/utils/validation/validEmptyRichText";
import { validFileSize } from "@/utils/validation/validFileSize";
import { validFileType } from "@/utils/validation/validFileType";
import { validLengthLessThanRichText } from "@/utils/validation/validLengthLessThanRichText";
import { validOnlyHalfSize } from "@/utils/validation/validOnlyHalfSize";
import { validStartDate } from "@/utils/validation/validStartDate";
import { validTextLengthEqual } from "@/utils/validation/validTextLengthEqual";
import { validTextLessThanEqualLength } from "@/utils/validation/validTextLessThanEqualLength";

export const couponSchema: Schema = {
  formSchema: [
    {
      name: "campaign_id",
      inputType: "TextField",
      label: "キャンペーンID",
      required: "キャンペーンIDは必須です",
      helperText: ["重複したキャンペーンIDが登録できません"],
      validates: {
        half: (v) => validOnlyHalfSize(v),
        length: (v) => validTextLengthEqual(v, 6),
      },
    },
    {
      name: "chain_store_name",
      inputType: "TextField",
      label: "チェーン店名",
      required: "チェーン店名は必須です",
      validates: (v) => validTextLessThanEqualLength(v, 50),
    },
    {
      name: "chain_store_logo",
      inputType: "ImgUploader",
      label: "チェーン店ロゴ画像",
      validates: {
        size: (v) => validFileSize(v, 153600),
      },
      helperText: ["画像容量は150KB未満"],
    },
    {
      name: "pin_file",
      inputType: "FileUploader",
      label: "PINファイル",
      required: "PINファイルは必須です",
      accept: "text/csv",
      validates: {
        fileTypeCheck: (v: File | undefined) =>
          validFileType(v?.name ?? "", ".csv"),
        csvFileCheck: (v, formValues) =>
          // pinFileNameが指定されている場合（編集時）はcouponIDとfileNameを考慮してチェックを行う
          formValues["pin_file_name"]
            ? validCsvFile(v, {
                couponName: formValues["pin_file_name"],
                couponId: formValues["id"],
              })
            : validCsvFile(v, null),
      },
    },
    {
      name: "coupon_img_1",
      inputType: "ImgUploader",
      label: "クーポン画像1",
      required: "クーポン画像1は必須です",
      validates: {
        size: (v) => {
          return validFileSize(v, 153600);
        },
      },
      helperText: ["画像容量は150KB未満"],
    },
    {
      name: "coupon_img_2",
      inputType: "ImgUploader",
      label: "クーポン画像2",
      validates: {
        size: (v) => validFileSize(v, 153600),
      },
      helperText: ["画像容量は150KB未満"],
    },
    {
      name: "coupon_img_3",
      inputType: "ImgUploader",
      label: "クーポン画像3",
      validates: {
        size: (v) => validFileSize(v, 153600),
      },
      helperText: ["画像容量は150KB未満"],
    },
    {
      name: "coupon_img_4",
      inputType: "ImgUploader",
      label: "クーポン画像4",
      validates: {
        size: (v) => validFileSize(v, 153600),
      },
      helperText: ["画像容量は150KB未満"],
    },
    {
      name: "coupon_img_5",
      inputType: "ImgUploader",
      label: "クーポン画像5",
      validates: {
        size: (v) => validFileSize(v, 153600),
      },
      helperText: ["画像容量は150KB未満"],
    },
    {
      name: "coupon_text",
      inputType: "RichText",
      label: "クーポン画像下テキスト",
      required: "クーポン画像下テキストは必須です",
      validates: {
        required: (v) =>
          validEmptyRichText(v, { label: "クーポン画像下テキスト" }),
        length: (v) =>
          validLengthLessThanRichText(v, {
            num: 100,
            label: "クーポン画像下テキスト",
          }),
      },
    },
    {
      name: "started",
      inputType: "DateTimeRangePicker",
      label: "利用期間",
      required: "利用期間は必須です",
      validates: {
        startDateValidation: (v: string, formValues: Record<string, any>) =>
          validStartDate(v, formValues["ended"]),
      },
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
      required: "利用方法は必須です",
      validates: {
        required: (v) => validEmptyRichText(v, { label: "利用方法" }),
        length: (v) =>
          validLengthLessThanRichText(v, { num: 100, label: "利用方法" }),
      },
    },
    {
      name: "notes",
      inputType: "RichText",
      label: "注意事項",
      required: "注意事項は必須です",
      validates: {
        required: (v) => validEmptyRichText(v, { label: "注意事項" }),
      },
    },
    {
      name: "status",
      inputType: "Select",
      label: "ステータス",
      required: "ステータスは必須です",
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
      ],
      defaultValue: "0",
    },
  ],
};
