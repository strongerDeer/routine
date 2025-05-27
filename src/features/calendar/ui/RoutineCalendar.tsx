"use client";
import Calendar from "react-calendar";
import styles from "./RoutineCalendar.module.scss";
import { format } from "date-fns";
import { useState } from "react";
import { useHealthData } from "../hooks/useHealthData";
import { HealthData } from "../model/types";

export default function RoutineCalendar() {
  const [currentDate] = useState<Date>(new Date());
  const { data } = useHealthData(currentDate);

  const dataMap = new Map<string, HealthData>();
  data.forEach((item) => {
    dataMap.set(item.date, item);
  });
  const getDataForDate = (date: Date): HealthData | null => {
    const dateStr = format(date, "yyyy-MM-dd");
    return dataMap.get(dateStr) || null;
  };

  function formatMinutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}:${remainingMinutes.toString().padStart(2, "0")}`;
  }

  return (
    <Calendar
      minDate={new Date("2025.05.01")}
      maxDate={new Date()}
      locale="ko-KR"
      className={styles.calendar}
      // onChange={handleDateClick}
      // value={selectedDate}

      tileContent={({ date }: { date: Date }) => {
        const dayData = getDataForDate(date);

        if (!dayData) return null;
        return (
          <div>
            {Number(dayData.steps) > 0 && (
              <p>
                <span>👟</span> <span> {dayData.steps}</span>
              </p>
            )}

            {Number(Number(dayData.activeEnergy).toFixed(0)) > 0 && (
              <p>
                <span>🔥</span>{" "}
                <span>
                  <strong>{Number(dayData.activeEnergy).toFixed(0)}</strong>/
                  {dayData.energy}Kcal
                </span>
              </p>
            )}

            {parseInt(dayData.workout) > 0 && (
              <p>
                <span>🏃</span>
                <span>{formatMinutesToHours(parseInt(dayData.workout))}</span>
                {parseInt(dayData.workout) >= 60 && <>✅</>}
              </p>
            )}
          </div>
        );
      }}
      tileClassName={styles.tile}
      formatShortWeekday={(_, date) =>
        ["ㅇ", "ㅎ", "ㅅ", "ㅁ", "ㄱ", "ㅌ", "ㅇ"][
          date.getDay() === 0 ? 6 : date.getDay() - 1
        ]
      }
      // 연/월 표시
      formatMonthYear={(_, date) => format(date, "yyyy. MM.")}
      // 일 표시
      formatDay={(_, date) => format(date, "dd")}
      prev2Label={<>PP</>}
      prevLabel={<>Prev</>}
      nextLabel={<>Next</>}
      next2Label={<>NN</>}
      selectRange={false}
    />
  );
}
