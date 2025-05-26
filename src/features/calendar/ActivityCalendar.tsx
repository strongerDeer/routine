// features/calendar/ui/ActivityCalendar.tsx

"use client";

import Calendar from "react-calendar";
import { format } from "date-fns";
import { ActivityData } from "@/entities/activity/model/types";
import { SelectedDateInfo } from "./SelectedDateInfo";
import { WeeklyStats } from "./WeeklyStats";
import { useCalendar } from "./useCalendar";
import { CalendarTile } from "./CalendarTile";
import { getTileClassName } from "./styles";

interface ActivityCalendarProps {
  data: ActivityData[];
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export function ActivityCalendar({ data }: ActivityCalendarProps) {
  const {
    selectedDate,
    selectedDateData,
    weeklyData,
    handleDateSelect,
    getDataForDate,
  } = useCalendar(data);

  // 캘린더 타일 내용 커스터마이징
  const tileContent = ({ date }: { date: Date }) => {
    const dayData = getDataForDate(date);
    return <CalendarTile data={dayData} />;
  };

  // 캘린더 타일 클래스네임 커스터마이징
  const tileClassName = ({ date }: { date: Date }) => {
    const dayData = getDataForDate(date);
    return getTileClassName(date, selectedDate, dayData);
  };

  const handleDateClick = (value: Value) => {
    if (value instanceof Date) {
      handleDateSelect(value);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">활동 달력</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 캘린더 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <Calendar
              onChange={handleDateClick}
              value={selectedDate}
              locale="ko-KR"
              tileContent={tileContent}
              tileClassName={tileClassName}
              showNeighboringMonth={false}
              formatShortWeekday={(locale, date) =>
                ["월", "화", "수", "목", "금", "토", "일"][
                  date.getDay() === 0 ? 6 : date.getDay() - 1
                ]
              }
              formatMonthYear={(locale, date) => format(date, "yyyy년 M월")}
            />
          </div>
        </div>

        {/* 선택된 날짜 정보 및 주간 통계 */}
        <div className="space-y-4">
          {selectedDate && (
            <SelectedDateInfo
              selectedDate={selectedDate}
              data={selectedDateData}
            />
          )}

          {selectedDate && weeklyData && (
            <WeeklyStats selectedDate={selectedDate} weeklyData={weeklyData} />
          )}
        </div>
      </div>
    </div>
  );
}
