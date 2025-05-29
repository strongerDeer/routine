"use client";

import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { useCalendarStore } from "../calendarStore";
import { useHealthData } from "../hooks/useHealthData";
import Link from "next/link";

export default function SelectedDate() {
  const { selectedDate } = useCalendarStore();
  const { data } = useHealthData(selectedDate as Date, true);

  console.log(selectedDate);

  return (
    <div className="w-80">
      {!selectedDate ? (
        <></>
      ) : (
        <>
          <h3>{format(selectedDate, "yyyy.MM.dd(E)", { locale: ko })}</h3>
          <Link href={`/health/edit/${format(selectedDate, "yyMMdd")}`}>
            수정하기
          </Link>

          {!data ? (
            <p>데이터가 없습니다</p>
          ) : (
            <div>
              <p> {data[0]?.steps}</p>
              <p>
                <strong>{data[0]?.activeEnergy}</strong>/ {data[0]?.energy}
              </p>
              <p> {data[0]?.workout}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
