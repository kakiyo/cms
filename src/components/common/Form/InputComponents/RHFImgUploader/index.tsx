import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { ChangeEvent, FC, useCallback, useRef, MouseEvent } from "react";
import {
  ImgUploaderSchema,
  InputGeneratorProps,
} from "../../FormGenerator/types";
import { RHFImgUploaderConfirm } from "./RHFImgUploaderConfirm";

export const RHFImgUploader: FC<InputGeneratorProps<ImgUploaderSchema>> = (
  props
) => {
  const { formSchema, rhFormProps, mode, error } = props;
  const value = rhFormProps.watch(formSchema.name) as File | string | undefined;
  const imgURL =
    value instanceof File ? URL.createObjectURL(value) : value ?? null;
  const { width, height = 200 } = formSchema;

  const onChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];
      if (file) {
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

  const clearRHFValue = useCallback(() => {
    rhFormProps.setValue(formSchema.name, "", {
      shouldValidate: true,
    });
  }, [formSchema.name, rhFormProps]);
  const clearInputValue = useCallback((e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  }, []);

  const fieldProps = rhFormProps.register(formSchema.name, {
    required: formSchema.required,
    validate: formSchema.validates,
  });

  if (mode === "confirm") {
    if (imgURL) {
      return (
        <RHFImgUploaderConfirm
          width={width}
          height={height}
          imagePath={imgURL}
        />
      );
    }
    return <></>;
  }

  return (
    <Stack width="100%">
      <Box
        height={value && height}
        width={width || "100%"}
        maxWidth={width}
        position="relative"
      >
        {imgURL && (
          <img
            src={imgURL}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "contain",
              objectPosition: "0 0",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </Box>
      <Box mt={value ? 1 : 0}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            onClick={onClick}
            variant="contained"
            color={error ? "error" : "primary"}
          >
            ファイルを選択
          </Button>
          {value && (
            <Button onClick={clearRHFValue} variant="outlined">
              ファイルを削除
            </Button>
          )}
        </Stack>
      </Box>
      <input
        ref={inputRef}
        type="file"
        onChange={onChange}
        accept="image/png, image/jpeg, image/jpg"
        onClick={clearInputValue}
        hidden
      />
      <input
        ref={fieldProps.ref}
        style={{ height: 0, border: 0, padding: 0 }}
      />
    </Stack>
  );
};
