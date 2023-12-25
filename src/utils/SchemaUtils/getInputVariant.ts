import {
  InputVariants,
  Schema,
} from "../../components/common/Form/FormGenerator/types";

export const getInputVariant = <T extends InputVariants>(
  schema: Schema,
  name: string
) => {
  return schema.formSchema.filter(
    (inputVariant) => inputVariant.name === name
  )[0] as T;
};
