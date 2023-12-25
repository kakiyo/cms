import { RHFDateTimeRangePicker } from "../InputComponents/RHFDateTimeRangePicker";
import { RHFFileUploader } from "../InputComponents/RHFFileUploader";
import { RHFImgUploader } from "../InputComponents/RHFImgUploader";
import { RHFReadOnly } from "../InputComponents/RHFReadOnly";
import { RHFRichText } from "../InputComponents/RHFRichText";
import { RHFTextField } from "../InputComponents/RHFTextField";
import { InputGeneratorProps } from "./types";
import { RHFAutocomplete } from "@/components/common/Form/InputComponents/RHFAutocomplete";
import { RHFSelect } from "@/components/common/Form/InputComponents/RHFSelect";

export const InputGenerator = (props: InputGeneratorProps) => {
  const { formSchema, ...otherProps } = props;

  /**
   * switchでinputTypeを網羅していることを検査しています
   * default句を追加しないでください
   */
  switch (formSchema.inputType) {
    case "TextField":
      return <RHFTextField formSchema={formSchema} {...otherProps} />;
    case "DateTimeRangePicker":
      return <RHFDateTimeRangePicker formSchema={formSchema} {...otherProps} />;
    case "ImgUploader":
      return <RHFImgUploader formSchema={formSchema} {...otherProps} />;
    case "Select":
      return <RHFSelect formSchema={formSchema} {...otherProps} />;
    case "Autocomplete":
      return <RHFAutocomplete formSchema={formSchema} {...otherProps} />;
    case "FileUploader":
      return <RHFFileUploader formSchema={formSchema} {...otherProps} />;
    case "Invisible":
    case "DateTimeRangePickerEnd":
      return <></>;
    case "ReadOnly":
      return <RHFReadOnly formSchema={formSchema} {...otherProps} />;
    case "RichText":
      return <RHFRichText formSchema={formSchema} {...otherProps} />;
  }
};
