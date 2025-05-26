// widgets/ActivityDashboard/ui/ActivityCalendar.tsx

"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { ActivityData } from "@/entities/activity/model/types";
import {
  format,
  isSameDay,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { ko } from "date-fns/locale";
import "react-calendar/dist/Calendar.css";

interface ActivityCalendarProps {
  data: ActivityData[];
  currentDate: Date;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export function ActivityCalendar({ data }: ActivityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 데이터를 날짜별로 매핑
  const dataMap = new Map<string, ActivityData>();
  data.forEach((item) => {
    dataMap.set(item.date, item);
  });

  // 특정 날짜의 데이터 가져오기
  const getDataForDate = (date: Date): ActivityData | null => {
    const dateStr = format(date, "yyyy-MM-dd");
    return dataMap.get(dateStr) || null;
  };

  // 선택된 주의 데이터 계산
  const getWeeklyData = (date: Date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    let totalSteps = 0;
    let totalActiveEnergy = 0;
    let totalEnergy = 0;
    let totalWorkout = 0;
    let dayCount = 0;

    const weekData: { date: Date; data: ActivityData | null }[] = [];

    weekDays.forEach((day) => {
      const dayData = getDataForDate(day);
      weekData.push({ date: day, data: dayData });

      if (dayData) {
        totalSteps += dayData.steps;
        totalActiveEnergy += dayData.activeEnergy;
        totalEnergy += dayData.energy;
        totalWorkout += dayData.workout;
        dayCount++;
      }
    });

    return {
      weekData,
      totals: {
        steps: totalSteps,
        activeEnergy: totalActiveEnergy,
        energy: totalEnergy,
        workout: totalWorkout,
      },
      averages: {
        steps: dayCount > 0 ? Math.round(totalSteps / dayCount) : 0,
        activeEnergy:
          dayCount > 0 ? Math.round(totalActiveEnergy / dayCount) : 0,
        energy: dayCount > 0 ? Math.round(totalEnergy / dayCount) : 0,
        workout: dayCount > 0 ? Math.round(totalWorkout / dayCount) : 0,
      },
    };
  };

  // 캘린더 타일 내용 커스터마이징
  const tileContent = ({ date }: { date: Date }) => {
    const dayData = getDataForDate(date);

    if (!dayData) return null;

    return (
      <div className="text-xs mt-1 space-y-0.5">
        <div className="flex justify-between">
          <span>👣</span>
          <span className="font-medium">
            {(dayData.steps / 1000).toFixed(1)}k
          </span>
        </div>
        <div className="flex justify-between">
          <span>🔥</span>
          <span className="font-medium">{dayData.activeEnergy}</span>
        </div>
        <div className="flex justify-between">
          <span>⚡</span>
          <span className="font-medium">{dayData.energy}</span>
        </div>
        <div className="flex justify-between">
          <span>🏃</span>
          <span className="font-medium">{dayData.workout}분</span>
        </div>
      </div>
    );
  };

  // 캘린더 타일 클래스네임 커스터마이징
  const tileClassName = ({ date }: { date: Date }) => {
    const dayData = getDataForDate(date);
    const isToday = isSameDay(date, new Date());

    let classes = "calendar-tile";

    if (isToday) {
      classes += " calendar-tile-today";
    }

    if (dayData) {
      classes += " calendar-tile-has-data";
    }

    if (selectedDate && isSameDay(date, selectedDate)) {
      classes += " calendar-tile-selected";
    }

    return classes;
  };

  const handleDateClick = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const weeklyData = selectedDate ? getWeeklyData(selectedDate) : null;

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

        {/* 선택된 날짜 정보 */}
        <div className="space-y-4">
          {selectedDate && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="font-semibold mb-3">
                {format(selectedDate, "M월 d일 (E)", { locale: ko })}
              </h4>

              {(() => {
                const dayData = getDataForDate(selectedDate);
                if (!dayData) {
                  return <p className="text-gray-500">데이터가 없습니다.</p>;
                }

                return (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="flex items-center">
                        <span className="mr-2">👣</span>
                        걸음 수
                      </span>
                      <span className="font-bold">
                        {dayData.steps.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="flex items-center">
                        <span className="mr-2">🔥</span>
                        활동 에너지
                      </span>
                      <span className="font-bold">
                        {dayData.activeEnergy} kcal
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="flex items-center">
                        <span className="mr-2">⚡</span>
                        전체 에너지
                      </span>
                      <span className="font-bold">{dayData.energy} kcal</span>
                    </div>

                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="flex items-center">
                        <span className="mr-2">🏃</span>
                        운동 시간
                      </span>
                      <span className="font-bold">{dayData.workout} 분</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 주간 통계 */}
          {selectedDate && weeklyData && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="font-semibold mb-3">
                {format(startOfWeek(selectedDate, { weekStartsOn: 1 }), "M/d")}{" "}
                ~ {format(endOfWeek(selectedDate, { weekStartsOn: 1 }), "M/d")}{" "}
                주간 통계
              </h4>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">주간 합계</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      걸음:{" "}
                      <span className="font-semibold">
                        {weeklyData.totals.steps.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      활동:{" "}
                      <span className="font-semibold">
                        {weeklyData.totals.activeEnergy}
                      </span>
                    </div>
                    <div>
                      에너지:{" "}
                      <span className="font-semibold">
                        {weeklyData.totals.energy}
                      </span>
                    </div>
                    <div>
                      운동:{" "}
                      <span className="font-semibold">
                        {weeklyData.totals.workout}분
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="text-sm text-gray-600 mb-1">일평균</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      걸음:{" "}
                      <span className="font-semibold">
                        {weeklyData.averages.steps.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      활동:{" "}
                      <span className="font-semibold">
                        {weeklyData.averages.activeEnergy}
                      </span>
                    </div>
                    <div>
                      에너지:{" "}
                      <span className="font-semibold">
                        {weeklyData.averages.energy}
                      </span>
                    </div>
                    <div>
                      운동:{" "}
                      <span className="font-semibold">
                        {weeklyData.averages.workout}분
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
