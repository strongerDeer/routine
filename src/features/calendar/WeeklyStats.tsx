// features/calendar/ui/WeeklyStats.tsx

import { format, startOfWeek, endOfWeek } from "date-fns";
import { WeeklyData } from "@/shared/types/calendar";

interface WeeklyStatsProps {
  selectedDate: Date;
  weeklyData: WeeklyData;
}

export function WeeklyStats({ selectedDate, weeklyData }: WeeklyStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h4 className="font-semibold mb-3">
        {format(startOfWeek(selectedDate, { weekStartsOn: 1 }), "M/d")} ~{" "}
        {format(endOfWeek(selectedDate, { weekStartsOn: 1 }), "M/d")} 주간 통계
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
              <span className="font-semibold">{weeklyData.totals.energy}</span>
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
  );
}
