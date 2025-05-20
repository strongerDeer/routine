// widgets/ActivityCharts/ui/MonthlySummary.tsx

"use client";

import { ActivityData } from "@/entities/activity/model/types";
import { calculateMonthlySummary } from "@/entities/activity/model/selectors";
import { BarChart } from "@/shared/ui/charts/BarChart";
import { format, parseISO, getWeek, startOfWeek, endOfWeek } from "date-fns";
import { ko } from "date-fns/locale";

interface MonthlySummaryProps {
  data: ActivityData[];
}

export function MonthlySummary({ data }: MonthlySummaryProps) {
  const summary = calculateMonthlySummary(data);

  if (!summary) {
    return <div className="text-center p-4">데이터가 없습니다.</div>;
  }

  // 데이터를 주별로 그룹화
  const weeklyData = [];
  const dataMap = new Map();

  data.forEach((item) => {
    const date = parseISO(item.date);
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekKey = format(weekStart, "yyyy-MM-dd");

    if (!dataMap.has(weekKey)) {
      dataMap.set(weekKey, {
        week: `${getWeek(date, { weekStartsOn: 1 })}주차`,
        steps: 0,
        activeEnergy: 0,
        energy: 0,
        workout: 0,
        count: 0,
      });
    }

    const weekData = dataMap.get(weekKey);
    weekData.steps += item.steps;
    weekData.activeEnergy += item.activeEnergy;
    weekData.energy += item.energy;
    weekData.workout += item.workout;
    weekData.count += 1;
  });

  dataMap.forEach((value) => {
    if (value.count > 0) {
      weeklyData.push({
        week: value.week,
        steps: Math.round(value.steps / value.count),
        activeEnergy: Math.round(value.activeEnergy / value.count),
        energy: Math.round(value.energy / value.count),
        workout: Math.round(value.workout / value.count),
      });
    }
  });

  // 주간 평균 걸음 수 데이터
  const stepsData = weeklyData.map((item) => ({
    date: item.week,
    value: item.steps,
  }));

  // 주간 평균 활동 에너지 데이터
  const activeEnergyData = weeklyData.map((item) => ({
    date: item.week,
    value: item.activeEnergy,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 mb-2">월 총 걸음 수</h4>
          <p className="text-2xl font-bold">
            {summary.totalSteps.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 mb-2">월 평균 걸음 수</h4>
          <p className="text-2xl font-bold">
            {summary.avgSteps.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 mb-2">월 총 활동 에너지</h4>
          <p className="text-2xl font-bold">
            {summary.totalActiveEnergy.toLocaleString()} kcal
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 mb-2">월 총 운동 시간</h4>
          <p className="text-2xl font-bold">
            {summary.totalWorkout.toLocaleString()} 분
          </p>
        </div>
      </div>

      {summary.maxStepsDay && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">이번 달 최고 활동일</h3>
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
        <h3 className="text-lg font-semibold mb-4">주간 평균 걸음 수</h3>
        <BarChart
          data={stepsData}
          label="평균 걸음 수"
          color="rgba(59, 130, 246, 0.7)"
          yAxisTitle="걸음 수"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">주간 평균 활동 에너지</h3>
        <BarChart
          data={activeEnergyData}
          label="평균 활동 에너지"
          color="rgba(220, 38, 38, 0.7)"
          yAxisTitle="칼로리 (kcal)"
        />
      </div>
    </div>
  );
}
