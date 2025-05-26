// entities/activity/model/useActivityData.ts

import { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
} from "date-fns";
import { ActivityData } from "./types";
import {
  getAllActivityData,
  getActivityDataByDateRange,
} from "../api/firebase";

// 빈 날짜 채우기
function fillMissingDates(
  data: ActivityData[],
  startDate: Date,
  endDate: Date
): ActivityData[] {
  const dateMap = new Map<string, ActivityData>();
  data.forEach((item) => {
    dateMap.set(item.date, item);
  });

  const result: ActivityData[] = [];
  const range = eachDayOfInterval({ start: startDate, end: endDate });

  range.forEach((date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (dateMap.has(dateStr)) {
      result.push(dateMap.get(dateStr)!);
    } else {
      result.push({
        date: dateStr,
        activeEnergy: 0,
        energy: 0,
        steps: 0,
        workout: 0,
      });
    }
  });

  return result;
}

export function useActivityData(currentDate: Date) {
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      console.log("useActivityData 데이터 가져오기 시작:", {
        currentDate,
      });
      setLoading(true);
      setError(null);

      try {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);

        const monthData = await getActivityDataByDateRange(
          monthStart,
          monthEnd
        );

        // 빈 날짜 포함하여 월요일부터 일요일까지의 데이터 준비
        const result = fillMissingDates(monthData, monthStart, monthEnd);
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("데이터를 가져오는 중 오류가 발생했습니다.")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentDate]);

  return { data, loading, error };
}
