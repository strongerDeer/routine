import CalendarUI from "@/features/calendar/ui/CalendarUI";
import SelectedDate from "@/features/calendar/ui/SelectedDate";

export default function HealthPage() {
  return (
    <>
      <header>
        {/* 필터 */}

        <label>
          <input type="checkbox" />
          운동
        </label>
        <label>
          <input type="checkbox" />
          기상
        </label>
        <label>
          <input type="checkbox" />
          독서
        </label>
        <label>
          <input type="checkbox" />
          영어
        </label>
        <label>
          <input type="checkbox" />
          배달
        </label>
        <label>
          <input type="checkbox" />
          행사
        </label>
        <label>
          <input type="checkbox" />
          개발
        </label>
      </header>
      <div className="flex gap-4">
        <CalendarUI />

        <SelectedDate />
      </div>
    </>
  );
}
