import { InputType } from "zlib";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { CenteringGrid } from "../../CenteringGrid";
import { RHFErrorMessage } from "../../HelperText/RHFErrorMessage";
import { InputGenerator } from "./InputGenerator";
import { Schema, InputMode, FormValueType } from "./types";
import { Validating } from "./validating";
import { ScrollContainer } from "@/components/common/ScrollContainer";
import { useScrollContainerElemSetter } from "@/store/scrollContainerElem";

type Props<T extends FormValueType> = {
  schema: Schema;
  children?: ReactNode;
  mutation?: (data: T) => Promise<any>;
  readOnly?: boolean;
  defaultData?: T;
  CompleteView?: ReactNode;
  ErrorView?: ReactNode;
  goBackFunc?: () => void;
};

export const FormGenerator = <T extends FormValueType>(props: Props<T>) => {
  const {
    defaultData,
    schema,
    mutation,
    children,
    readOnly = false,
    goBackFunc,
    CompleteView,
    ErrorView,
  } = props;
  const [mode, setMode] = useState<InputMode>("input");
  const formRef = useRef<HTMLDivElement>(null);
  const { setScrollContainerElem } = useScrollContainerElemSetter();
  useEffect(() => {
    setScrollContainerElem(formRef.current);
  }, [setScrollContainerElem]);
  useEffect(() => {
    //次へ、戻る際に画面トップにスクロールするように
    formRef.current?.scrollTo({ top: 0 });
  }, [mode]);
  // 初期値を抽出
  const defaultValues = defaultData
    ? Object.fromEntries(
        schema.formSchema.map((inputSchema) => [
          inputSchema.name,
          defaultData[inputSchema.name] ?? "",
        ])
      )
    : Object.fromEntries(
        schema.formSchema.map((inputSchema) => [
          inputSchema.name,
          inputSchema.defaultValue ?? "",
        ])
      );
  const rhFormProps = useForm<FormValueType>({
    defaultValues,
    mode: "onBlur" || "onChange" || "onTouched",
  });

  const setPrevMode = useCallback(() => {
    setMode((mode) => (mode === "complete" ? "confirm" : "input"));
  }, []);

  const onClickConfirm = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      const isValid = await rhFormProps.trigger(undefined, {
        shouldFocus: true,
      });
      if (isValid) {
        setMode("confirm");
      }
    },
    [rhFormProps]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      await mutation?.(rhFormProps.getValues() as T); // exclusiveMutation内で最新データ取得のため、非同期処理
      setIsSubmitting(false);
      setMode("complete");
    } catch (e) {
      setMode("error");
    }
  }, [mutation, rhFormProps]);

  const bottomButton = {
    input: (
      <CenteringGrid>
        <Button
          onClick={goBackFunc}
          variant="outlined"
          sx={{ justifySelf: "start" }}
        >
          キャンセル
        </Button>
        <Button
          onClick={onClickConfirm}
          disabled={rhFormProps.formState.isValidating}
          variant="contained"
        >
          {rhFormProps.formState.isValidating ? <Validating /> : "確認"}
        </Button>
      </CenteringGrid>
    ),
    confirm: (
      <CenteringGrid>
        <Button
          onClick={setPrevMode}
          variant="outlined"
          sx={{ justifySelf: "start" }}
        >
          戻る
        </Button>
        <Button onClick={onSubmit} variant="contained">
          確定
        </Button>
      </CenteringGrid>
    ),
    complete: <></>,
    error: <></>,
  };

  if (mode === "complete") {
    return <>{CompleteView}</>;
  }

  if (mode === "error") {
    return <>{ErrorView}</>;
  }

  // 処理をスキップするinputコンポーネントを追加
  const skipInputTypes: InputType[] = ["Invisible", "DateTimeRangePickerEnd"];

  return (
    <ScrollContainer ref={formRef}>
      <form>
        <Stack>
          {schema.formSchema.map((formSchema, index) => {
            const isRequired = !!formSchema.required;
            if (skipInputTypes.includes(formSchema.inputType)) {
              return;
            }
            return (
              <Box
                display="grid"
                gridTemplateColumns="218px 1fr"
                gridTemplateRows={`repeat(${schema.formSchema.length} 1fr)`}
                border="1px solid rgb(229, 229, 229)"
                mb="-1px"
                key={`form input ${index}`}
              >
                <Box
                  bgcolor="#F9F9FB"
                  display="flex"
                  alignItems="center"
                  pl={2}
                >
                  <Stack>
                    {isRequired && !readOnly && (
                      <Typography
                        sx={{
                          color: "#fff",
                          bgcolor: "#f0ad4e",
                          fontSize: "10px",
                          width: "fit-content",
                          py: "2px",
                          px: "4px",
                          borderRadius: "8px",
                        }}
                      >
                        必須
                      </Typography>
                    )}
                    <Typography margin="auto" width="100%">
                      {formSchema.label}
                    </Typography>
                    {formSchema.helperText?.map((helperText, index) => {
                      return (
                        <Typography
                          key={`${formSchema.name}'s helper ${index}`}
                          fontSize="10px"
                          color="#707070"
                        >
                          {helperText}
                        </Typography>
                      );
                    })}
                  </Stack>
                </Box>
                <Stack direction="column" width="100%" p={2}>
                  <InputGenerator
                    formSchema={formSchema}
                    rhFormProps={rhFormProps}
                    mode={readOnly ? "confirm" : mode}
                    error={!!rhFormProps.formState.errors[formSchema.name]}
                  />
                  <RHFErrorMessage
                    errors={rhFormProps.formState.errors}
                    name={formSchema.name}
                  />
                </Stack>
              </Box>
            );
          })}
          {children}
          <Box mt={2}>{!readOnly && bottomButton[mode]}</Box>
        </Stack>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1">アップロード中</Typography>
          <CircularProgress color="inherit" size="16px" />
        </Stack>
      </Backdrop>
    </ScrollContainer>
  );
};
