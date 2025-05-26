import { isSameDay } from "date-fns";
import { ActivityData } from "./model";

export const getTileClassName = (
  date: Date,
  selectedDate: Date | null,
  dayData: ActivityData | null
): string => {
  const isToday = isSameDay(date, new Date());

  let classes = "calendar-tile";

  if (isToday) {
    classes += " calendar-tile-today";
  }

  if (dayData) {
    classes += " calendar-tile-has-data";
  }

  if (selectedDate && isSameDay(date, selectedDate)) {
    classes += " calendar-tile-selected";
  }

  return classes;
};
