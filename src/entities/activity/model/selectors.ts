// entities/activity/model/selectors.ts

import { ActivityData } from "./types";

// 주간 요약 계산
export function calculateWeeklySummary(data: ActivityData[]) {
  if (!data || data.length === 0) return null;

  const totalSteps = data.reduce((sum, day) => sum + day.steps, 0);
  const totalActiveEnergy = data.reduce(
    (sum, day) => sum + day.activeEnergy,
    0
  );
  const totalEnergy = data.reduce((sum, day) => sum + day.energy, 0);
  const totalWorkout = data.reduce((sum, day) => sum + day.workout, 0);

  const avgSteps = Math.round(totalSteps / data.length);
  const avgActiveEnergy = Math.round(totalActiveEnergy / data.length);
  const avgEnergy = Math.round(totalEnergy / data.length);
  const avgWorkout = Math.round(totalWorkout / data.length);

  const maxSteps = Math.max(...data.map((day) => day.steps));
  const maxStepsDay = data.find((day) => day.steps === maxSteps);

  return {
    totalSteps,
    totalActiveEnergy,
    totalEnergy,
    totalWorkout,
    avgSteps,
    avgActiveEnergy,
    avgEnergy,
    avgWorkout,
    maxStepsDay,
  };
}

// 월간 요약 계산
export function calculateMonthlySummary(data: ActivityData[]) {
  return calculateWeeklySummary(data); // 기본적으로 같은 계산 로직 사용
}
