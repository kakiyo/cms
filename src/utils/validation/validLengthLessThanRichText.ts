import { getPlainText } from "../richText/getPlainText";
import { Valid } from "./types";

export const validLengthLessThanRichText: Valid<
  string,
  { num: number; label: string }
> = (json, { label, num }) => {
  // undefinedの場合はチェックしない
  if (!json) {
    return;
  }
  return (
    getPlainText(json).length <= num || `${label}は${num}文字以内にしてください`
  );
};
