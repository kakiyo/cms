import { Button, Theme, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  ChangeEvent,
  MouseEvent,
  FC,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  FileUploaderSchema,
  InputGeneratorProps,
} from "../../FormGenerator/types";
import { RHFFileUploaderConfirm } from "./RHFFileUploaderConfirm";

export const RHFFileUploader: FC<InputGeneratorProps<FileUploaderSchema>> = (
  props
) => {
  const { formSchema, rhFormProps, mode, error } = props;
  const value = rhFormProps.watch(formSchema.name) as File | undefined;
  const [helperText, setHelperText] = useState(
    formSchema.defaultValue || "ファイルを選択してください"
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];
      if (file) {
        setHelperText(file.name);
        rhFormProps.setValue(formSchema.name, file, {
          shouldValidate: true,
        });
      }
    },
    [formSchema.name, rhFormProps]
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = useCallback(() => {
    inputRef.current?.click();
  }, []);
  const clearInputValue = useCallback((e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  }, []);

  const fieldProps = rhFormProps.register(formSchema.name, {
    required: formSchema.required,
    validate: formSchema.validates,
  });

  const disabled = !!formSchema.disabledMessage?.length;
  const helperColor = useCallback(
    (theme: Theme) =>
      disabled ? theme.palette.error.main : theme.palette.text.primary,
    [disabled]
  );

  if (mode === "confirm") {
    // valueが空の場合は空文字をconfirmに送る
    return <RHFFileUploaderConfirm fileName={value ? helperText : ""} />;
  }

  return (
    <Stack width="100%" justifyContent="center">
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          onClick={onClick}
          variant="contained"
          color={error ? "error" : "warning"}
          disabled={disabled}
        >
          ファイルを選択
        </Button>
        <Typography variant="body1" color={helperColor}>
          {formSchema.disabledMessage || helperText}
        </Typography>
      </Stack>
      <input
        ref={inputRef}
        type="file"
        onChange={onChange}
        onClick={clearInputValue}
        accept={formSchema.accept}
        hidden
      />
      {/* バリデーションを反映させるためのダミーinput↓ */}
      <input
        ref={fieldProps.ref}
        style={{ height: 0, border: 0, padding: 0 }}
      />
    </Stack>
  );
};
