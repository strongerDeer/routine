"use client";
import Calendar from "react-calendar";
import styles from "./RoutineCalendar.module.scss";
import { format } from "date-fns";

export default function RoutineCalendar() {
  return (
    <Calendar
      minDate={new Date("2025.05.01")}
      maxDate={new Date()}
      locale="ko-KR"
      className={styles.calendar}
      // onChange={handleDateClick}
      // value={selectedDate}
      tileContent={({ date }: { date: Date }) => {
        return (
          <div>
            <p>
              <span>👟</span>
              <span>000</span>
            </p>
            <p>
              <span>🔥</span>
              <span>000</span>
            </p>
            <p>
              <span>⚡</span>
              <span>000</span>
            </p>
            <p>
              <span>🏃</span>
              <span>000</span>
            </p>
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
