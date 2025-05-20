// entities/activity/api/firebase.ts

import { ref, get, query, orderByKey, startAt, endAt } from "firebase/database";
import { database } from "@/shared/lib/firebase";
import { format } from "date-fns";
import { ActivityData } from "../model/types";

interface HeathData {
  activeEnergy: string;
  energy: string;
  steps: string;
  workout: string;
}
interface FirebaseData {
  daily: Record<string, HeathData>;
}
// 모든 활동 데이터를 가져오는 함수
export async function getAllActivityData(): Promise<ActivityData[]> {
  const activityRef = ref(database, "/");
  const snapshot = await get(activityRef);

  if (snapshot.exists()) {
    const data: FirebaseData = snapshot.val();

    return Object.entries(data.daily)
      .map(([date, values]) => {
        return {
          date,
          activeEnergy: parseInt(values.activeEnergy || "0"),
          energy: parseInt(values.energy || "0"),
          steps: parseInt(values.steps || "0"),
          workout: parseInt(values.workout || "0"),
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  return [];
}

// 날짜 범위에 따른 활동 데이터를 가져오는 함수
export async function getActivityDataByDateRange(
  startDate: Date,
  endDate: Date
): Promise<ActivityData[]> {
  const startDateStr = format(startDate, "yyyy-MM-dd");
  const endDateStr = format(endDate, "yyyy-MM-dd");

  const activityRef = ref(database, "/");
  const dataQuery = query(
    activityRef,
    orderByKey(),
    startAt(startDateStr),
    endAt(endDateStr)
  );

  const snapshot = await get(dataQuery);

  if (snapshot.exists()) {
    const data: FirebaseData = snapshot.val();
    return Object.entries(data)
      .map(([date, values]) => {
        return {
          date,
          activeEnergy: parseInt(values.activeEnergy || "0"),
          energy: parseInt(values.energy || "0"),
          steps: parseInt(values.steps || "0"),
          workout: parseInt(values.workout || "0"),
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  return [];
}
