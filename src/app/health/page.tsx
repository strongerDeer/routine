import RoutineCalendar from "@/features/calendar/RoutineCalendar";
import { ActivityDashboard } from "@/widgets/ActivityDashboard/ui/ActivityDashboard";

export default function HealthPage() {
  return (
    <>
      <RoutineCalendar />
      <ActivityDashboard />;
    </>
  );
}
