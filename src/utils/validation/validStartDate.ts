import dayjs from "dayjs";
import { Valid } from "./types";

export const validStartDate: Valid<string, string> = (startDate, endDate) => {
  // undefinedの場合はチェックしない
  if (!startDate) {
    return;
  }
  return (
    dayjs(startDate).isBefore(endDate) ||
    "利用開始日は利用終了日より前の日時にしてください"
  );
};
