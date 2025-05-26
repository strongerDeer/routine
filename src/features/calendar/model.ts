export interface ActivityData {
  date: string;
  activeEnergy: number;
  energy: number;
  steps: number;
  workout: number;
}

export interface CalendarTileData {
  date: Date;
  hasData: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export interface WeeklyStats {
  totals: {
    steps: number;
    activeEnergy: number;
    energy: number;
    workout: number;
  };
  averages: {
    steps: number;
    activeEnergy: number;
    energy: number;
    workout: number;
  };
}

export interface WeeklyData {
  weekData: Array<{
    date: Date;
    data: ActivityData | null;
  }>;
  totals: WeeklyStats["totals"];
  averages: WeeklyStats["averages"];
}
