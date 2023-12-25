import { MenuItem, Select, useTheme } from "@mui/material";
import { FC } from "react";
import { RHFSelectConfirm } from "./RHFSelectConfirm";
import {
  InputGeneratorProps,
  SelectSchema,
} from "@/components/common/Form/FormGenerator/types";

export const RHFSelect: FC<InputGeneratorProps<SelectSchema>> = (props) => {
  const { rhFormProps, formSchema, mode, error } = props;
  const value = rhFormProps.watch(formSchema.name) as string;
  const theme = useTheme();
  const activeColor = formSchema.list
    .find(
      // valueが0だったり'0'だったりする
      (item) => item.value == value
    )
    ?.color?.(theme);

  const fieldProps = rhFormProps.register(formSchema.name, {
    required: formSchema.required,
    validate: formSchema.validates,
  });

  if (mode === "confirm") {
    return (
      <RHFSelectConfirm
        text={formSchema.list.find((item) => item.value == value)?.label ?? ""}
        color={activeColor}
      />
    );
  }

  return (
    <Select
      {...fieldProps}
      fullWidth
      error={error}
      value={value}
      sx={{ color: activeColor }}
    >
      {formSchema.list.map((listItem) => {
        return (
          <MenuItem
            key={"form-select-item-" + listItem.label}
            value={listItem.value}
            sx={{
              color: listItem.color ? listItem.color(theme) : undefined,
            }}
          >
            {listItem.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};
