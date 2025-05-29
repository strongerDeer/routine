import { format } from "date-fns";

export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  const thisDate = new Date(
    2000 + parseInt(date.slice(0, 2)), // 년도
    parseInt(date.slice(2, 4)) - 1, // 월 (0-based)
    parseInt(date.slice(4, 6)) // 일
  );

  return (
    <div>
      <h2>{format(thisDate, "yyyy년 MM월 dd일")} 수정</h2>
      <form>
        <ul>
          <li>
            <label>
              기상: <input type="time" />
            </label>
          </li>
          <li>
            <label>
              몸무게: <input type="number" />
            </label>
          </li>
          <li>운동:</li>
          <li>
            <label>
              말해보카: <input type="checkbox" />
            </label>
          </li>
          <li>
            <label>
              배달: <input type="text" />
            </label>
          </li>
          <li>
            <label>
              전시:
              <input type="text" />
              <input type="file" />
            </label>
          </li>
          <li>
            독서:
            <input type="text" />
            완결여부
            <input type="checkbox" />
          </li>
          <li>
            개발공부:
            <input type="checkbox" />
          </li>
        </ul>
      </form>
    </div>
  );
}
