import { useState, useContext, useEffect } from "react";

import CalendarHeader from "src/components/CalendarHeader/CalendarHeader";
import Sidebar from "src/components/Sidebar/Sidebar";
import { getMonth } from "src/utils/getMonth";

import GlobalContext from "src/context/GlobalContext";
import Month from "src/components/Month";
import dayjs from "dayjs";
import Button from "src/components/Button/Button";
import Icon from "src/components/icon";
import { ICON_TYPE } from "src/components/icon/icon";
import { Heading } from "src/components/Typography/Typography";
import { useModalContext } from "src/context/ModalContext/Modal";

export default function Calendar() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, setMonthIndex } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  const calendarHeader = (
    <CalendarHeader>
      <Button variant="primary" mr="normal" onClick={handleReset}>
        Today
      </Button>

      <Icon
        onClick={handlePrevMonth}
        type={ICON_TYPE.ARROW_LEFT}
        height={40}
        width={40}
      />

      <Icon
        onClick={handleNextMonth}
        type={ICON_TYPE.ARROW_RIGHT}
        height={40}
        width={40}
      />
      <Heading style={{ flexGrow: 1 }} fontSize={25}>
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </Heading>
    </CalendarHeader>
  );

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        // display: "flex",
      }}
    >
      {/* {showEventModal && <EventModal />} */}

      {calendarHeader}
      <div
        style={{
          // display: "flex",
          // flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            maxHeight: "100%",
          }}
        >
          {/* <Sidebar /> */}
          <Month month={currenMonth} />
        </div>
      </div>
    </div>
  );
}
