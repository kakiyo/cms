import { couponSchema } from "./couponSchema";
import {
  FileUploaderSchema,
  Schema,
} from "@/components/common/Form/FormGenerator/types";
import { addInputVariant } from "@/utils/SchemaUtils/addInputVariant";
import { getInputVariant } from "@/utils/SchemaUtils/getInputVariant";
import { pushInputVariants } from "@/utils/SchemaUtils/pushInputVariant";
import { removeInputVariants } from "@/utils/SchemaUtils/removeInputVariants";

export const couponEditRemovePinSchema: Schema = removeInputVariants(
  couponSchema,
  ["pin_file"]
);

export const couponEditIncludePinSchema = addInputVariant(
  pushInputVariants(couponEditRemovePinSchema, [
    {
      inputType: "Invisible",
      name: "id",
      label: "",
    },
    {
      inputType: "Invisible",
      name: "pin_file_name",
      label: "",
    },
  ]),
  {
    ...getInputVariant<FileUploaderSchema>(couponSchema, "pin_file"),
    required: undefined,
  },
  3
);
