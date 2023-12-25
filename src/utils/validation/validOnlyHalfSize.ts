import { Valid } from "./types";

export const validOnlyHalfSize: Valid<string> = (value) => {
  // undefinedの場合はチェックしない
  if (!value) {
    return;
  }
  return (
    /^[a-zA-Z0-9]+$/.test(value) || "半角英数字以外入力することはできません"
  );
};
