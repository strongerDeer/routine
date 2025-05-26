import { format } from "date-fns";
import { ko } from "date-fns/locale";

const today = new Date();

export default function Today() {
  return <p>{format(today, "yyyy.MM.dd(EEE)", { locale: ko })}</p>;
}
