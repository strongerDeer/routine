// widgets/ActivityDashboard/ui/MonthlyStatsCards.tsx

import { ActivityData } from "@/entities/activity/model/types";
import { calculateMonthlySummary } from "@/entities/activity/model/selectors";

interface MonthlyStatsCardsProps {
  data: ActivityData[];
}

export function MonthlyStatsCards({ data }: MonthlyStatsCardsProps) {
  const summary = calculateMonthlySummary(data);

  if (!summary) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">데이터가 없습니다.</p>
      </div>
    );
  }

  const stats = [
    {
      title: "걸음 수",
      total: summary.totalSteps,
      average: summary.avgSteps,
      unit: "걸음",
      color: "bg-blue-500",
    },
    {
      title: "활동 에너지",
      total: summary.totalActiveEnergy,
      average: summary.avgActiveEnergy,
      unit: "kcal",
      color: "bg-red-500",
    },
    {
      title: "전체 에너지",
      total: summary.totalEnergy,
      average: summary.avgEnergy,
      unit: "kcal",
      color: "bg-orange-500",
    },
    {
      title: "운동 시간",
      total: summary.totalWorkout,
      average: summary.avgWorkout,
      unit: "분",
      color: "bg-green-500",
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">월간 합계</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-md p-6 border-l-4"
            style={{ borderLeftColor: stat.color.replace("bg-", "") }}
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}
              >
                <div className="w-6 h-6 bg-white rounded opacity-80"></div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </h4>
                <div className="space-y-1">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      {stat.total.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      {stat.unit}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">총합</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-lg font-semibold text-gray-700">
                      {stat.average.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      {stat.unit}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">평균</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
