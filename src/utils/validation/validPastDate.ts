import dayjs from "dayjs";
import { Valid } from "./types";

export const validPastDate: Valid<string> = (value) => {
  // undefinedの場合はチェックしない
  if (!value) {
    return;
  }
  return (
    dayjs(value).isAfter(dayjs(new Date())) ||
    "過去の日付を設定することはできません"
  );
};
