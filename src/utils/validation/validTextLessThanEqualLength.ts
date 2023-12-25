import { Valid } from "./types";

export const validTextLessThanEqualLength: Valid<string, number> = (
  text,
  length
) => {
  // undefinedの場合はチェックしない
  if (!text) {
    return;
  }
  return text.length <= length || `文字数は${length}文字以内にしてください`;
};
