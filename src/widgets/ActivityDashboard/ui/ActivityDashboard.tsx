// widgets/ActivityDashboard/ui/ActivityDashboard.tsx

"use client";

import { useState } from "react";
import { format, subMonths, addMonths } from "date-fns";
import { ko } from "date-fns/locale";
import { useActivityData } from "@/entities/activity/model/useActivityData";
import { MonthlyStatsCards } from "./MonthlyStatsCards";
import { ActivityCalendar } from "./ActivityCalendar";

export function ActivityDashboard() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const { data, loading, error } = useActivityData(currentDate);

  const handleNavigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      direction === "prev"
        ? subMonths(currentDate, 1)
        : addMonths(currentDate, 1)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">활동 대시보드</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleNavigateMonth("prev")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            이전
          </button>
          <h2 className="text-xl font-semibold min-w-[120px] text-center">
            {format(currentDate, "yyyy년 M월", { locale: ko })}
          </h2>
          <button
            onClick={() => handleNavigateMonth("next")}
            disabled={new Date() < currentDate}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">데이터 로딩 중...</div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>오류 발생: {error.message}</p>
        </div>
      ) : (
        <div className="space-y-8">
          <MonthlyStatsCards data={data} />
          <ActivityCalendar data={data} currentDate={currentDate} />
        </div>
      )}
    </div>
  );
}
