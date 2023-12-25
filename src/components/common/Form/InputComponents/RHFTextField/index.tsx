import { TextField } from "@mui/material";
import { ChangeEvent, FC, useCallback } from "react";
import {
  InputGeneratorProps,
  TextFieldSchema,
} from "../../FormGenerator/types";
import { RHFTextFieldConfirm } from "./RHFTextFieldConfirm";

export const RHFTextField: FC<InputGeneratorProps<TextFieldSchema>> = (
  props
) => {
  const { rhFormProps, formSchema, mode, error } = props;
  const value = rhFormProps.watch(formSchema.name) as string;

  const fieldProps = rhFormProps.register(formSchema.name, {
    required: formSchema.required,
    validate: formSchema.validates,
  });

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      rhFormProps.setValue(formSchema.name, e.target.value, {
        shouldValidate: true,
      });
    },
    [formSchema.name, rhFormProps]
  );

  if (mode === "confirm") {
    return <RHFTextFieldConfirm text={value} />;
  }

  return (
    <TextField
      {...fieldProps}
      value={value}
      onChange={onChange}
      fullWidth
      error={error}
    />
  );
};
