import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

type RenderInputProps = {
  options: string[];
  isLoading: boolean;
  rhfSetValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  name: string;
};
export const SearchAutoComplete: FC<RenderInputProps> = (props) => {
  const { options, isLoading, rhfSetValue, watch, name } = props;
  const rhfValue = watch(name);
  const [autoValue, setAutoValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  // フォームコントローラー側でリセットされた場合フィールドをリセットする
  useEffect(() => {
    if (!rhfValue) {
      setInputValue("");
      setAutoValue("");
    }
  }, [rhfValue]);

  const onChange = useCallback(
    (
      _: SyntheticEvent<Element, Event>,
      newVal: unknown,
      reason: AutocompleteChangeReason
    ) => {
      //  オートコンプリートの変更に合わせてフォームの値を変更
      if (reason === "clear") {
        rhfSetValue(name, "");
        setAutoValue("");
      } else {
        rhfSetValue(name, newVal as string);
        setAutoValue(newVal as string);
      }
    },
    [name, rhfSetValue]
  );

  const onInputChange = useCallback(
    (
      _: SyntheticEvent<Element, Event>,
      newVal: unknown,
      reason: AutocompleteInputChangeReason
    ) => {
      if (reason === "clear") {
        setInputValue("");
      } else {
        setInputValue(newVal as string);
      }
    },
    []
  );

  const isOptionEqualToValue = useCallback(
    (option: string, value: string) => option === value || value === "",
    []
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => <TextField {...params} />,
    []
  );

  const isOpen = !!inputValue && autoValue !== inputValue;

  return (
    <Autocomplete
      renderInput={renderInput}
      options={options}
      fullWidth
      loading={isLoading}
      clearOnEscape
      value={autoValue}
      inputValue={inputValue}
      onChange={onChange}
      onInputChange={onInputChange}
      isOptionEqualToValue={isOptionEqualToValue}
      open={isOpen}
    />
  );
};
