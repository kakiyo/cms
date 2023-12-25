import { ReactNode } from "react";

export type SearchItemTypes = "text" | "autoComplete";
export type SearchItemType<T extends SearchItemTypes> = T;

type SearchItemBase<T extends SearchItemTypes> = {
  type: T;
  key: string;
  label: string;
  helperComponent?: ReactNode;
};

export type SearchItemText = SearchItemBase<"text">;

export type SearchItemAutoComplete = SearchItemBase<"autoComplete"> & {
  apiPath: string;
  dataKey: string;
};

export type SearchItem = SearchItemText | SearchItemAutoComplete;

export type SearchSchema = Array<SearchItem>;
