import { Theme } from "@mui/material";
import {
  FieldPathValue,
  Message,
  UseFormReturn,
  Validate,
  ValidationRule,
} from "react-hook-form";
import { Coupon } from "@/types/couponApi";
import { UserInfo } from "@/types/user";

export type InputTypes =
  | "TextField"
  | "DateTimeRangePicker"
  | "DateTimeRangePickerEnd"
  | "ImgUploader"
  | "Button"
  | "Select"
  | "FileUploader"
  | "Autocomplete"
  | "Invisible"
  | "RichText"
  | "ReadOnly";

type InputSchema<TInputType extends InputTypes> = {
  name: string;
  inputType: TInputType;
  label: string;
  helperText?: string[];
  defaultValue?: string;
  validates?:
    | Validate<FieldPathValue<any, any>, any>
    | Record<string, Validate<FieldPathValue<any, any>, any>>;
  required?: Message | ValidationRule<boolean>;
};
export type ReadOnlySchema = InputSchema<"ReadOnly">;
export type InvisibleSchema = InputSchema<"Invisible">;
export type TextFieldSchema = InputSchema<"TextField">;
export type DateTimePickerRangeSchema = InputSchema<"DateTimeRangePicker">;
export type DateTimePickerRangeEndSchema =
  InputSchema<"DateTimeRangePickerEnd">;
export type SelectSchema = InputSchema<"Select"> & {
  list: Array<{
    label: string;
    value: string;
    color?: (theme: Theme) => string;
  }>;
};
export type RichTextSchema = InputSchema<"RichText">;
export type FileUploaderSchema = InputSchema<"FileUploader"> & {
  accept?: string;
  disabledMessage?: string;
};
export type ImgUploaderSchema = {
  width?: number;
  height?: number;
} & InputSchema<"ImgUploader">;
export type AutocompleteSchema = InputSchema<"Autocomplete"> & {
  optionsQuery: Promise<Array<string>>;
};
export type InputVariants =
  | TextFieldSchema
  | DateTimePickerRangeSchema
  | DateTimePickerRangeEndSchema
  | SelectSchema
  | ImgUploaderSchema
  | FileUploaderSchema
  | AutocompleteSchema
  | InvisibleSchema
  | RichTextSchema
  | ReadOnlySchema;

export type InputMode = "input" | "confirm" | "complete" | "error";

export type Schema = {
  formSchema: InputVariants[];
};

export type FormValueType = Coupon | UserInfo;

export type InputGeneratorProps<T extends InputVariants = InputVariants> = {
  formSchema: T;
  rhFormProps: UseFormReturn<FormValueType>;
  mode: InputMode;
  error: boolean;
};
