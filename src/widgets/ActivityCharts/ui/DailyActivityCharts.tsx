// widgets/ActivityCharts/ui/DailyActivityCharts.tsx

"use client";

import { BarChart } from "@/shared/ui/charts/BarChart";
import { LineChart } from "@/shared/ui/charts/LineChart";
import { ActivityData } from "@/entities/activity/model/types";

interface DailyActivityChartsProps {
  data: ActivityData[];
}

export function DailyActivityCharts({ data }: DailyActivityChartsProps) {
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

  // 전체 에너지 데이터 준비
  const energyData = data.map((item) => ({
    date: item.date,
    value: item.energy,
  }));

  // 운동 시간 데이터 준비
  const workoutData = data.map((item) => ({
    date: item.date,
    value: item.workout,
  }));

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">일일 걸음 수</h3>
        <div className="h-80">
          <BarChart
            data={stepsData}
            label="걸음 수"
            color="rgba(59, 130, 246, 0.7)"
            yAxisTitle="걸음 수"
            height={300}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">일일 활동 에너지</h3>
        <div className="h-80">
          <LineChart
            data={activeEnergyData}
            label="활동 에너지"
            color="rgba(220, 38, 38, 0.2)"
            borderColor="rgba(220, 38, 38, 0.8)"
            yAxisTitle="칼로리 (kcal)"
            height={300}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">일일 전체 에너지</h3>
        <div className="h-80">
          <LineChart
            data={energyData}
            label="전체 에너지"
            color="rgba(249, 115, 22, 0.2)"
            borderColor="rgba(249, 115, 22, 0.8)"
            yAxisTitle="칼로리 (kcal)"
            height={300}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">일일 운동 시간</h3>
        <div className="h-80">
          <BarChart
            data={workoutData}
            label="운동 시간"
            color="rgba(132, 204, 22, 0.7)"
            yAxisTitle="분"
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
