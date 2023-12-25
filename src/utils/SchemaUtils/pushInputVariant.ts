import {
  InputVariants,
  Schema,
} from "../../components/common/Form/FormGenerator/types";

export const pushInputVariants = (schema: Schema, variant: InputVariants[]) => {
  const newSchema: Schema = {
    formSchema: [...schema.formSchema, ...variant],
  };
  return newSchema;
};
