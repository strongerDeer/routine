// pages/ui/ActivityTrackerPage.tsx 수정

"use client";

import { useState } from "react";
import {
  format,
  subWeeks,
  addWeeks,
  subMonths,
  addMonths,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useActivityData } from "@/entities/activity/model/useActivityData";
import { DailyActivityCharts } from "@/widgets/ActivityCharts/ui/DailyActivityCharts";
import { WeeklySummary } from "@/widgets/ActivityCharts/ui/WeeklySummary";
import { MonthlySummary } from "@/widgets/ActivityCharts/ui/MonthlySummary";

type ViewType = "daily" | "weekly" | "monthly";

export function ActivityTrackerPage() {
  const [viewType, setViewType] = useState<ViewType>("daily");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const { data, loading, error } = useActivityData(viewType, currentDate);

  // 일별 뷰에서도 날짜 이동 가능하도록 수정
  const handleNavigateDate = (direction: "prev" | "next") => {
    if (viewType === "daily") {
      // 일간 뷰에서는 1주일씩 이동
      setCurrentDate(
        direction === "prev"
          ? subWeeks(currentDate, 1)
          : addWeeks(currentDate, 1)
      );
    } else if (viewType === "weekly") {
      setCurrentDate(
        direction === "prev"
          ? subWeeks(currentDate, 1)
          : addWeeks(currentDate, 1)
      );
    } else if (viewType === "monthly") {
      setCurrentDate(
        direction === "prev"
          ? subMonths(currentDate, 1)
          : addMonths(currentDate, 1)
      );
    }
  };

  // 현재 기간 표시 텍스트
  const getPeriodText = () => {
    if (viewType === "daily") {
      // 월요일부터 일요일까지 표시
      const monday = startOfWeek(currentDate, { weekStartsOn: 1 });
      const sunday = addDays(monday, 6);
      return `${format(monday, "M/d", { locale: ko })} ~ ${format(
        sunday,
        "M/d",
        { locale: ko }
      )}`;
    } else if (viewType === "weekly") {
      const start = format(
        startOfWeek(currentDate, { weekStartsOn: 1 }),
        "M월 d일",
        { locale: ko }
      );
      const end = format(
        endOfWeek(currentDate, { weekStartsOn: 1 }),
        "M월 d일",
        { locale: ko }
      );
      return `${start} ~ ${end}`;
    } else if (viewType === "monthly") {
      return format(currentDate, "yyyy년 M월", { locale: ko });
    }
    return "";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">활동 트래커</h1>

      {/* 탭 네비게이션 */}
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 ${
            viewType === "daily" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setViewType("daily")}
        >
          일별
        </button>
        <button
          className={`py-2 px-4 ${
            viewType === "weekly" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setViewType("weekly")}
        >
          주별
        </button>
        <button
          className={`py-2 px-4 ${
            viewType === "monthly" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setViewType("monthly")}
        >
          월별
        </button>
      </div>

      {/* 날짜 네비게이션 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleNavigateDate("prev")}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          이전
        </button>
        <h2 className="text-xl font-semibold">{getPeriodText()}</h2>
        <button
          onClick={() => handleNavigateDate("next")}
          disabled={new Date() < currentDate}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>

      {/* 로딩 상태 */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">데이터 로딩 중...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>오류 발생: {error.message}</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">데이터가 없습니다.</p>
        </div>
      ) : (
        <div>
          {viewType === "daily" && <DailyActivityCharts data={data} />}
          {viewType === "weekly" && <WeeklySummary data={data} />}
          {viewType === "monthly" && <MonthlySummary data={data} />}
        </div>
      )}
    </div>
  );
}
