import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
} from "@mui/base/useAutocomplete/useAutocomplete";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as React from "react";
import { RHFAutoCompleteConfirm } from "./RHFAutoCompleteConfirm";
import {
  AutocompleteSchema,
  InputGeneratorProps,
} from "@/components/common/Form/FormGenerator/types";

type Option = string;

export const RHFAutocomplete: FC<InputGeneratorProps<AutocompleteSchema>> = (
  props
) => {
  const { rhFormProps, formSchema, mode, error } = props;
  const value = rhFormProps.watch(formSchema.name) as Option;
  const [options, setOptions] = useState<Array<Option>>([]);
  useEffect(() => {
    formSchema.optionsQuery.then((res) => {
      setOptions(res);
    });
  });

  const fieldProps = rhFormProps.register(formSchema.name, {
    required: formSchema.required,
    validate: formSchema.validates,
  });

  const renderInput: (params: AutocompleteRenderInputParams) => ReactNode =
    useCallback(
      (params) => {
        return <TextField {...params} error={error} />;
      },
      [error]
    );

  const handleOnChange = useMemo(
    () =>
      function <optionT, Multiple, DisableClearable, FreeSolo>(
        event: React.SyntheticEvent,
        value: AutocompleteValue<optionT, Multiple, DisableClearable, FreeSolo>,
        _reason: AutocompleteChangeReason,
        _details?: AutocompleteChangeDetails<optionT>
      ) {
        rhFormProps.setValue(formSchema.name, value, {
          shouldValidate: true,
        });
      },
    [formSchema.name, rhFormProps]
  );

  const isOptionEqualToValue = useCallback(
    (option: Option, value: Option) => option === value,
    []
  );

  if (mode === "confirm") {
    return <RHFAutoCompleteConfirm text={value} />;
  }

  return (
    <Autocomplete
      {...fieldProps}
      renderInput={renderInput}
      onChange={handleOnChange}
      options={options}
      clearOnEscape
      fullWidth
      isOptionEqualToValue={isOptionEqualToValue}
    />
  );
};
