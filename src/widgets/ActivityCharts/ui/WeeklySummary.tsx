// widgets/ActivityCharts/ui/WeeklySummary.tsx

"use client";

import { ActivityData } from "@/entities/activity/model/types";
import { calculateWeeklySummary } from "@/entities/activity/model/selectors";
import { BarChart } from "@/shared/ui/charts/BarChart";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

interface WeeklySummaryProps {
  data: ActivityData[];
}

export function WeeklySummary({ data }: WeeklySummaryProps) {
  const summary = calculateWeeklySummary(data);

  if (!summary) {
    return <div className="text-center p-4">데이터가 없습니다.</div>;
  }

  // 걸음 수 데이터 준비
  const stepsData = data.map((item) => ({
    date: item.date,
    value: item.steps,
  }));

  // 활동 에너지 데이터 준비
  const activeEnergyData = data.map((item) => ({
    date: item.date,
    value: item.activeEnergy,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 mb-2">총 걸음 수</h4>
          <p className="text-2xl font-bold">
            {summary.totalSteps.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 mb-2">평균 걸음 수</h4>
          <p className="text-2xl font-bold">
            {summary.avgSteps.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 mb-2">총 활동 에너지</h4>
          <p className="text-2xl font-bold">
            {summary.totalActiveEnergy.toLocaleString()} kcal
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 mb-2">총 운동 시간</h4>
          <p className="text-2xl font-bold">
            {summary.totalWorkout.toLocaleString()} 분
          </p>
        </div>
      </div>

      {summary.maxStepsDay && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">이번 주 최고 활동일</h3>
          <p>
            <span className="font-medium">
              {format(
                parseISO(summary.maxStepsDay.date),
                "yyyy년 M월 d일 (E)",
                { locale: ko }
              )}
            </span>
            에{" "}
            <span className="font-bold">
              {summary.maxStepsDay.steps.toLocaleString()}
            </span>
            걸음을 걸었습니다.
          </p>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">주간 걸음 수</h3>
        <BarChart
          data={stepsData}
          label="걸음 수"
          color="rgba(59, 130, 246, 0.7)"
          yAxisTitle="걸음 수"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">주간 활동 에너지</h3>
        <BarChart
          data={activeEnergyData}
          label="활동 에너지"
          color="rgba(220, 38, 38, 0.7)"
          yAxisTitle="칼로리 (kcal)"
        />
      </div>
    </div>
  );
}
