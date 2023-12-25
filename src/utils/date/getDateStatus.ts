import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

type GetDateStatus = (
  date: Date | string,
  begin: Date | string,
  end: Date | string
) => "before" | "within" | "after";
export const getDateStatus: GetDateStatus = (date, begin, end) => {
  if (dayjs(date).isBefore(dayjs(begin))) {
    return "before";
  } else if (dayjs(date).isSameOrBefore(dayjs(end))) {
    return "within";
  } else {
    return "after";
  }
};
