import { getPlainText } from "../richText/getPlainText";
import { Valid } from "./types";

export const validEmptyRichText: Valid<string, { label: string }> = (
  json,
  { label }
) => {
  // undefinedの場合はチェックしない
  if (!json) {
    return;
  }
  return getPlainText(json).length !== 0 || `${label}は必須です`;
};
