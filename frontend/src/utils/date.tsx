import { formatDistanceStrict } from "date-fns";
//import { IComments } from "../types/types";

export const convertDate = (dateStr: string) => {
  const str = formatDistanceStrict(new Date(dateStr), new Date());
  //more than one
  if (str.includes("seconds")) {
    return str.replace(" seconds", "s");
  }
  if (str.includes("hours")) {
    return str.replace(" hours", "h");
  }
  if (str.includes("minutes")) {
    return str.replace(" minutes", "m");
  }
  if (str.includes("days")) {
    return str.replace(" days", "d");
  }
  if (str.includes("months")) {
    return str.replace(" months", "mon");
  }
  if (str.includes("years")) {
    return str.replace(" years", "yr");
  }
  //ones
  if (str.includes("second")) {
    return str.replace(" second", "s");
  }
  if (str.includes("hour")) {
    return str.replace(" hour", "h");
  }
  if (str.includes("minute")) {
    return str.replace(" minute", "m");
  }
  if (str.includes("day")) {
    return str.replace(" day", "d");
  }
  if (str.includes("month")) {
    return str.replace(" month", "mon");
  }
  if (str.includes("year")) {
    return str.replace(" year", "yr");
  }

  return str;
};

