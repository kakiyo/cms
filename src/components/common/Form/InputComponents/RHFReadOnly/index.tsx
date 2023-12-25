import { TextField } from "@mui/material";
import { FC } from "react";
import { InputGeneratorProps, ReadOnlySchema } from "../../FormGenerator/types";

export const RHFReadOnly: FC<InputGeneratorProps<ReadOnlySchema>> = (props) => {
  const { rhFormProps, formSchema, error } = props;

  const fieldProps = rhFormProps.register(formSchema.name, {
    required: formSchema.required,
    validate: formSchema.validates,
  });

  return <TextField {...fieldProps} fullWidth error={error} disabled />;
};
