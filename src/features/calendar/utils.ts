// shared/lib/calendar/utils.ts

import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { ActivityData } from "@/entities/activity/model/types";
import { WeeklyData } from "./model";

export const createDataMap = (
  data: ActivityData[]
): Map<string, ActivityData> => {
  const dataMap = new Map<string, ActivityData>();
  data.forEach((item) => {
    dataMap.set(item.date, item);
  });
  return dataMap;
};

export const getDataForDate = (
  date: Date,
  dataMap: Map<string, ActivityData>
): ActivityData | null => {
  const dateStr = format(date, "yyyy-MM-dd");
  return dataMap.get(dateStr) || null;
};

export const calculateWeeklyData = (
  date: Date,
  dataMap: Map<string, ActivityData>
): WeeklyData => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  let totalSteps = 0;
  let totalActiveEnergy = 0;
  let totalEnergy = 0;
  let totalWorkout = 0;
  let dayCount = 0;

  const weekData: { date: Date; data: ActivityData | null }[] = [];

  weekDays.forEach((day) => {
    const dayData = getDataForDate(day, dataMap);
    weekData.push({ date: day, data: dayData });

    if (dayData) {
      totalSteps += dayData.steps;
      totalActiveEnergy += dayData.activeEnergy;
      totalEnergy += dayData.energy;
      totalWorkout += dayData.workout;
      dayCount++;
    }
  });

  return {
    weekData,
    totals: {
      steps: totalSteps,
      activeEnergy: totalActiveEnergy,
      energy: totalEnergy,
      workout: totalWorkout,
    },
    averages: {
      steps: dayCount > 0 ? Math.round(totalSteps / dayCount) : 0,
      activeEnergy: dayCount > 0 ? Math.round(totalActiveEnergy / dayCount) : 0,
      energy: dayCount > 0 ? Math.round(totalEnergy / dayCount) : 0,
      workout: dayCount > 0 ? Math.round(totalWorkout / dayCount) : 0,
    },
  };
};
