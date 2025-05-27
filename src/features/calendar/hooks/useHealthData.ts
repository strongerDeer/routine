import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

import { getActivityDataByDateRange } from "../api/firebase";
import { HealthData } from "../model/types";

// 빈 날짜 채우기
function fillMissingDates(
  data: HealthData[],
  startDate: Date,
  endDate: Date
): HealthData[] {
  const dateMap = new Map<string, HealthData>();
  data.forEach((item) => {
    dateMap.set(item.date, item);
  });

  const result: HealthData[] = [];
  const range = eachDayOfInterval({ start: startDate, end: endDate });

  range.forEach((date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (dateMap.has(dateStr)) {
      result.push(dateMap.get(dateStr)!);
    } else {
      result.push({
        date: dateStr,
        activeEnergy: "0",
        energy: "0",
        steps: "0",
        workout: "0",
      });
    }
  });

  return result;
}

export function useHealthData(currentDate: Date) {
  const [data, setData] = useState<HealthData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      console.log("useHealthData 데이터 가져오기 시작:", {
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
