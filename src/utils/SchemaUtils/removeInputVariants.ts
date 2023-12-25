import { Schema } from "../../components/common/Form/FormGenerator/types";

export const removeInputVariants: (
  schema: Schema,
  names: string[]
) => Schema = (schema, names) => {
  return {
    formSchema: schema.formSchema.filter(
      (inputVariant) => !names.includes(inputVariant.name)
    ),
  };
};
