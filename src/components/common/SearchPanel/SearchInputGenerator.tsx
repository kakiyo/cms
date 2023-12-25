import { TextField } from "@mui/material";
import { FC } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { SearchAutoComplete } from "./SearchAutoComplete";
import { SearchItem } from "./types";
import { useQueryGen } from "@/hooks/useQueryGen";

type Props = {
  searchItem: SearchItem;
  rhfProps: UseFormReturn<FieldValues, any>;
};

export const SearchInputGenerator: FC<Props> = (props) => {
  const { searchItem: itemProps, rhfProps } = props;
  const fieldProps = rhfProps.register(itemProps.key);
  const optionFetchApiPath =
    itemProps.type === "autoComplete" ? itemProps.apiPath : "";

  const isFetchEnable = itemProps.type === "autoComplete";

  const { data, isLoading } = useQueryGen(optionFetchApiPath, {
    enabled: isFetchEnable,
  });

  switch (itemProps.type) {
    case "text": {
      return <TextField {...fieldProps} />;
    }
    case "autoComplete": {
      return (
        <SearchAutoComplete
          rhfSetValue={rhfProps.setValue}
          watch={rhfProps.watch}
          name={itemProps.key}
          options={data ? data[itemProps.dataKey] : []}
          isLoading={isLoading}
        />
      );
    }
  }
};
