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

export function useActivityData(
  viewType: "daily" | "weekly" | "monthly",
  currentDate: Date
) {
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        if (viewType === "daily") {
          // 일간 뷰 - 항상 월요일부터 시작하도록 설정
          const allData = await getAllActivityData();

          // 현재 날짜의 이번 주 월요일 구하기
          const today = currentDate;
          const mondayOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });

          // 일주일 기간 (월요일~일요일)
          const endOfThisWeek = addDays(mondayOfThisWeek, 6);

          // 빈 날짜 포함하여 월요일부터 일요일까지의 데이터 준비
          const weekData = fillMissingDates(
            allData,
            mondayOfThisWeek,
            endOfThisWeek
          );
          setData(weekData);
        } else if (viewType === "weekly") {
          // 주간 뷰
          const start = startOfWeek(currentDate, { weekStartsOn: 1 });
          const end = endOfWeek(currentDate, { weekStartsOn: 1 });
          const weekData = await getActivityDataByDateRange(start, end);
          setData(fillMissingDates(weekData, start, end));
        } else if (viewType === "monthly") {
          // 월간 뷰
          const start = startOfMonth(currentDate);
          const end = endOfMonth(currentDate);
          const monthData = await getActivityDataByDateRange(start, end);
          setData(fillMissingDates(monthData, start, end));
        }
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
  }, [viewType, currentDate]);

  return { data, loading, error };
}
