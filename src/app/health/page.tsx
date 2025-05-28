import CalendarUI from "@/features/calendar/ui/CalendarUI";
import SelectedDate from "@/features/calendar/ui/SelectedDate";

export default function HealthPage() {
  return (
    <div className="flex gap-4">
      <CalendarUI />

      <SelectedDate />
    </div>
  );
}
