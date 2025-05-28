import { formatMinutesToHours } from "../lib/utils";
import { HealthData } from "../model/types";

export default function CalendarTile({ data }: { data: HealthData | null }) {
  if (!data) return null;
  return (
    <div>
      {Number(data.steps) > 0 && (
        <p>
          <span>👟</span> <span> {data.steps}</span>
        </p>
      )}

      {Number(Number(data.activeEnergy).toFixed(0)) > 0 && (
        <p>
          <span>🔥</span>{" "}
          <span>
            <strong>{Number(data.activeEnergy).toFixed(0)}</strong>/
            {data.energy}Kcal
          </span>
        </p>
      )}

      {parseInt(data.workout) > 0 && (
        <p>
          <span>🏃</span>
          <span>{formatMinutesToHours(parseInt(data.workout))}</span>
          {parseInt(data.workout) >= 60 && <>✅</>}
        </p>
      )}
    </div>
  );
}
