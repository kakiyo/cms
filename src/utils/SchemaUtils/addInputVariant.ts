import {
  InputVariants,
  Schema,
} from "../../components/common/Form/FormGenerator/types";

export const addInputVariant = (
  schema: Schema,
  variant: InputVariants,
  index: number
) => {
  const newSchema: Schema = {
    formSchema: [
      ...schema.formSchema.slice(0, index),
      variant,
      ...schema.formSchema.slice(index),
    ],
  };
  return newSchema;
};
