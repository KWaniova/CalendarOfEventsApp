import dayjs from "dayjs";
import { useState, useContext, useEffect } from "react";
import GlobalContext from "src/context/GlobalContext";
import { getMonth } from "src/utils/getMonth";

export default function useCalendar() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setMonthIndex, setReload } = useContext(GlobalContext);

  useEffect(() => {
    setReload(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  function handlePrevMonth() {
    debugger;
    setMonthIndex((monthIndex - 1) % 12);
  }
  function handleNextMonth() {
    setMonthIndex((monthIndex + 1) % 12);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month() ? monthIndex : dayjs().month()
    );
  }

  return {
    handleNextMonth,
    handlePrevMonth,
    handleReset,
    currenMonth,
    monthIndex,
  };
}
