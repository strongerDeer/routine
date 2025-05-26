// shared/ui/Calendar/CalendarTile.tsx

import { ActivityData } from "@/entities/activity/model/types";

interface CalendarTileProps {
  data: ActivityData | null;
}

export function CalendarTile({ data }: CalendarTileProps) {
  if (!data) return null;

  return (
    <div className="text-xs mt-1 space-y-0.5">
      <div className="flex justify-between">
        <span>👣</span>
        <span className="font-medium">{(data.steps / 1000).toFixed(1)}k</span>
      </div>
      <div className="flex justify-between">
        <span>🔥</span>
        <span className="font-medium">{data.activeEnergy}</span>
      </div>
      <div className="flex justify-between">
        <span>⚡</span>
        <span className="font-medium">{data.energy}</span>
      </div>
      <div className="flex justify-between">
        <span>🏃</span>
        <span className="font-medium">{data.workout}분</span>
      </div>
    </div>
  );
}
