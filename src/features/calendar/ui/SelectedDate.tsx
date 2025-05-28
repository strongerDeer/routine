"use client";

import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { useCalendarStore } from "../calendarStore";
import { useHealthData } from "../hooks/useHealthData";

export default function SelectedDate() {
  const { selectedDate } = useCalendarStore();
  const { data } = useHealthData(selectedDate as Date, true);

  if (!selectedDate) {
    return <div className="w-80"></div>;
  }

  if (!data)
    return (
      <div className="w-80">
        <h3>{format(selectedDate, "yyyy.MM.dd(E)", { locale: ko })}</h3>
        <p>데이터가 없습니다</p>
      </div>
    );

  return (
    <div className="w-80">
      <h3>{format(selectedDate, "yyyy.MM.dd(E)", { locale: ko })}</h3>

      {!data ? (
        <p>데이터가 없습니다</p>
      ) : (
        <div>
          <p> {data[0].steps}</p>
          <p>
            <strong>{data[0].activeEnergy}</strong>/ {data[0].energy}
          </p>
          <p> {data[0].workout}</p>
        </div>
      )}
    </div>
  );
}
