"use client";
import Calendar from "react-calendar";
import styles from "./CalendarUI.module.scss";
import { format } from "date-fns";

import { useHealthData } from "../hooks/useHealthData";

import { createDataMap, getDataForDate } from "../lib/utils";
import CalendarTile from "./CalendarTile";
import { useCalendarStore } from "../calendarStore";

export default function CalendarUI() {
  const { today, selectedDate, setSelectedDate } = useCalendarStore();
  const { data } = useHealthData(today);
  const dataMap = createDataMap(data);

  return (
    <Calendar
      minDate={new Date("2025.05.01")}
      maxDate={today}
      locale="ko-KR"
      className={styles.calendar}
      onChange={(value) => {
        if (value instanceof Date) {
          setSelectedDate(value);
        }
      }}
      value={selectedDate}
      tileContent={({ date }: { date: Date }) => {
        const dayData = getDataForDate(date, dataMap);
        return <CalendarTile data={dayData} />;
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
