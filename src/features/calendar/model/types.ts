export interface HealthData extends HealthDataItem {
  date: string;
}

export interface HealthDataItem {
  activeEnergy: string;
  energy: string;
  steps: string;
  workout: string;
}

// Firebase 데이터 구조 타입
export interface FirebaseHealthData {
  daily?: Record<string, HealthDataItem>;
  [key: string]: unknown;
}
