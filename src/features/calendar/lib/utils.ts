import { format } from "date-fns";
import { HealthData } from "./model/types";

export function formatMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}:${remainingMinutes.toString().padStart(2, "0")}`;
}
export const createDataMap = (data: HealthData[]): Map<string, HealthData> => {
  const dataMap = new Map<string, HealthData>();
  data.forEach((item) => {
    dataMap.set(item.date, item);
  });
  return dataMap;
};

export const getDataForDate = (
  date: Date,
  dataMap: Map<string, HealthData>
): HealthData | null => {
  const dateStr = format(date, "yyyy-MM-dd");
  return dataMap.get(dateStr) || null;
};
