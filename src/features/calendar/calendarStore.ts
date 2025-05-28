import { create } from "zustand";
import { HealthData } from "./model/types";
import { devtools } from "zustand/middleware";

interface CalendarState {
  // 상태
  today: Date;
  selectedDate: Date | null;
  data: HealthData[];
  loading: boolean;
  error: Error | null;

  // 액션
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  setData: (data: HealthData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

const initialState = {
  today: new Date(),
  selectedDate: null,
  data: [],
  loading: false,
  error: null,
};

export const useCalendarStore = create<CalendarState>()(
  devtools(
    (set) => ({
      ...initialState,

      // 기본 액션들
      setCurrentDate: (date) => set({ today: date }, false, "setCurrentDate"),
      setSelectedDate: (date) =>
        set({ selectedDate: date }, false, "setSelectedDate"),
      setData: (data) => set({ data }, false, "setData"),
      setLoading: (loading) => set({ loading }, false, "setLoading"),
      setError: (error) => set({ error }, false, "setError"),
    }),
    {
      name: "calendar-store", // Redux DevTools에 표시될 이름
    }
  )
);

export const useCurrentDate = () => useCalendarStore((state) => state.today);
export const useSelectedDate = () =>
  useCalendarStore((state) => state.selectedDate);
export const useCalendarData = () => useCalendarStore((state) => state.data);
export const useCalendarLoading = () =>
  useCalendarStore((state) => state.loading);
export const useCalendarError = () => useCalendarStore((state) => state.error);
