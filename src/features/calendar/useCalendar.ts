// features/calendar/model/useCalendar.ts

import { useState, useMemo } from "react";
import { ActivityData } from "@/entities/activity/model/types";
import { calculateWeeklyData, createDataMap, getDataForDate } from "./utils";

export const useCalendar = (data: ActivityData[]) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dataMap = useMemo(() => createDataMap(data), [data]);

  const getDataForSelectedDate = () => {
    if (!selectedDate) return null;
    return getDataForDate(selectedDate, dataMap);
  };

  const getWeeklyDataForSelectedDate = () => {
    if (!selectedDate) return null;
    return calculateWeeklyData(selectedDate, dataMap);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return {
    selectedDate,
    dataMap,
    selectedDateData: getDataForSelectedDate(),
    weeklyData: getWeeklyDataForSelectedDate(),
    handleDateSelect,
    getDataForDate: (date: Date) => getDataForDate(date, dataMap),
  };
};
