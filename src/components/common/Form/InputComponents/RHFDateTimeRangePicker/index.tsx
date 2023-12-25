import { Stack, Typography, useTheme } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import {
  DateTimePickerRangeSchema,
  InputGeneratorProps,
} from "../../FormGenerator/types";
import { RHFDateTimePickerRangeConfirm } from "./RHFDateTimePickerRangeConfirm";

export const RHFDateTimeRangePicker: FC<
  InputGeneratorProps<DateTimePickerRangeSchema>
> = (props) => {
  const { rhFormProps, formSchema, mode, error } = props;
  const endName = formSchema.name.replace("started", "ended");
  const startValue = rhFormProps.watch(formSchema.name) as string;
  const endValue = rhFormProps.watch(endName) as string;
  const theme = useTheme();

  const startFieldProps = rhFormProps.register(formSchema.name, {
    required: formSchema.required,
    validate: formSchema.validates,
  });
  const endFieldProps = rhFormProps.register(endName, {
    required: formSchema.required,
  });

  const handleOnStartChange = useMemo(
    () =>
      function (value: Dayjs | null) {
        rhFormProps.setValue(formSchema.name, value?.tz().format() ?? "", {
          shouldValidate: true,
        });
      },
    [formSchema.name, rhFormProps]
  );
  const handleOnEndChange = useMemo(
    () =>
      function (value: Dayjs | null) {
        rhFormProps.setValue(endName, value?.tz().format() ?? "");
        rhFormProps.trigger(formSchema.name);
      },
    [endName, formSchema.name, rhFormProps]
  );
  const handleOnBlur = useCallback(() => {
    //終了日のバリデーションが開始日のバリデーションに含まれているため
    //終了日の入力が終わる際に開始日のバリデーションする
    rhFormProps.trigger(startFieldProps.name);
  }, [rhFormProps, startFieldProps.name]);

  const commonProps = useMemo(
    () => ({
      format: "YYYY-MM-DD HH:mm",
      ampm: false,
      timeSteps: { hours: 1, minutes: 1 },
      sx: {
        width: "100%",
        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
          borderColor: error
            ? `${theme.palette.error.main} !important`
            : "#rgb(192, 192, 192)",
          borderWidth: "1px !important",
        },
        ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
          color: error ? theme.palette.error.main : "currentcolor",
        },
      },
    }),
    [error, theme.palette.error.main]
  );

  const startDateTimePicker = useCallback(
    () => (
      <DesktopDateTimePicker
        {...commonProps}
        slotProps={{
          field: { onBlur: handleOnBlur },
        }}
        ref={startFieldProps.ref}
        onOpen={handleOnBlur}
        label={"開始日"}
        value={startValue ? dayjs(startValue) : null}
        onChange={handleOnStartChange}
      />
    ),
    [
      commonProps,
      handleOnBlur,
      handleOnStartChange,
      startFieldProps.ref,
      startValue,
    ]
  );

  const endDateTImePicker = useCallback(
    () => (
      <DesktopDateTimePicker
        {...commonProps}
        label={"終了日"}
        format={"YYYY-MM-DD HH:mm"}
        onChange={handleOnEndChange}
        slotProps={{
          field: { onBlur: handleOnBlur },
        }}
        value={
          rhFormProps.getValues(endName)
            ? dayjs(rhFormProps.getValues(endName) as string)
            : null
        }
        sx={{
          width: "100%",
          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            borderColor: error
              ? `${theme.palette.error.main} !important`
              : "#rgb(192, 192, 192)",
            borderWidth: "1px !important",
          },
          ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
            color: error ? theme.palette.error.main : "currentcolor",
          },
        }}
      />
    ),
    [
      commonProps,
      endName,
      error,
      handleOnBlur,
      handleOnEndChange,
      rhFormProps,
      theme.palette.error.main,
    ]
  );

  if (formSchema.name.includes("ended")) return null;

  if (mode === "confirm") {
    return (
      <Stack
        direction="row"
        width={"100%"}
        spacing={2}
        alignItems={"center"}
        style={{ wordBreak: "break-all" }}
      >
        <RHFDateTimePickerRangeConfirm dateStr={startValue} />
        <Typography>~</Typography>
        <RHFDateTimePickerRangeConfirm dateStr={endValue} />
      </Stack>
    );
  }

  return (
    <Stack direction="row" width={"100%"} spacing={2} alignItems={"center"}>
      <Controller
        name={startFieldProps.name}
        control={rhFormProps.control}
        render={startDateTimePicker}
      />
      <Typography>~</Typography>
      <Controller
        name={endFieldProps.name}
        control={rhFormProps.control}
        render={endDateTImePicker}
      />
    </Stack>
  );
};
