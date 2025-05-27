import { ref, get } from "firebase/database";
import { database } from "@/shared/lib/firebase";
import { format } from "date-fns";
import { FirebaseHealthData, HealthData, HealthDataItem } from "../model/types";

// 모든 활동 데이터를 가져오는 함수
export async function getAllActivityData(): Promise<HealthData[]> {
  try {
    console.log("getAllActivityData 함수 시작");

    const activityRef = ref(database, "/");
    const snapshot = await get(activityRef);

    if (snapshot.exists()) {
      const data = snapshot.val() as FirebaseHealthData;
      console.log("Firebase에서 가져온 전체 데이터:", data);

      // daily 키가 있는 경우
      if (data.daily) {
        return Object.entries(data.daily)
          .map(([date, values]) => ({
            date,
            activeEnergy: values.activeEnergy || "0",
            energy: values.energy || "0",
            steps: values.steps || "0",
            workout: values.workout || "0",
          }))
          .sort((a, b) => a.date.localeCompare(b.date));
      }

      // daily 키가 없고 데이터가 바로 날짜별로 구성된 경우
      const entries = Object.entries(data);
      return entries
        .filter(([key, value]) => {
          // 날짜 형식 확인 (YYYY-MM-DD)
          return (
            /^\d{4}-\d{2}-\d{2}$/.test(key) &&
            value &&
            typeof value === "object"
          );
        })
        .map(([date, values]) => ({
          date,
          activeEnergy: (values as HealthDataItem).activeEnergy || "0",
          energy: (values as HealthDataItem).energy || "0",
          steps: (values as HealthDataItem).steps || "0",
          workout: (values as HealthDataItem).workout || "0",
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
    }

    return [];
  } catch (error) {
    console.error("getAllActivityData 오류:", error);
    throw error;
  }
}

// 날짜 범위에 따른 활동 데이터를 가져오는 함수 - 수정된 버전
export async function getActivityDataByDateRange(
  startDate: Date,
  endDate: Date
): Promise<HealthData[]> {
  try {
    console.log("getActivityDataByDateRange 함수 시작");
    const startDateStr = format(startDate, "yyyy-MM-dd");
    const endDateStr = format(endDate, "yyyy-MM-dd");
    console.log("검색할 날짜 범위:", startDateStr, "~", endDateStr);

    // 방법 1: 전체 데이터를 가져와서 필터링 (더 안전한 방법)
    const allData = await getAllActivityData();
    console.log("전체 데이터 개수:", allData.length);

    if (allData.length === 0) {
      console.log("전체 데이터가 없습니다.");
      return [];
    }

    // 날짜 범위로 필터링
    const filteredData = allData.filter((item) => {
      return item.date >= startDateStr && item.date <= endDateStr;
    });

    console.log("필터링된 데이터 개수:", filteredData.length);
    console.log("필터링된 데이터 첫 3개:", filteredData.slice(0, 3));

    return filteredData;
  } catch (error) {
    console.error("getActivityDataByDateRange 오류:", error);
    throw error;
  }
}
