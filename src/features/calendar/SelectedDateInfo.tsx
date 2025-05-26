// features/calendar/ui/SelectedDateInfo.tsx

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ActivityData } from "@/entities/activity/model/types";

interface SelectedDateInfoProps {
  selectedDate: Date;
  data: ActivityData | null;
}

export function SelectedDateInfo({
  selectedDate,
  data,
}: SelectedDateInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h4 className="font-semibold mb-3">
        {format(selectedDate, "M월 d일 (E)", { locale: ko })}
      </h4>

      {!data ? (
        <p className="text-gray-500">데이터가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
            <span className="flex items-center">
              <span className="mr-2">👣</span>
              걸음 수
            </span>
            <span className="font-bold">{data.steps.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center p-2 bg-red-50 rounded">
            <span className="flex items-center">
              <span className="mr-2">🔥</span>
              활동 에너지
            </span>
            <span className="font-bold">{data.activeEnergy} kcal</span>
          </div>

          <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
            <span className="flex items-center">
              <span className="mr-2">⚡</span>
              전체 에너지
            </span>
            <span className="font-bold">{data.energy} kcal</span>
          </div>

          <div className="flex justify-between items-center p-2 bg-green-50 rounded">
            <span className="flex items-center">
              <span className="mr-2">🏃</span>
              운동 시간
            </span>
            <span className="font-bold">{data.workout} 분</span>
          </div>
        </div>
      )}
    </div>
  );
}
