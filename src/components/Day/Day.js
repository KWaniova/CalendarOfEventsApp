import dayjs from "dayjs";
import  { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";


import { Heading } from "../Typography/Typography";
import { ClickableWrapper, DayDateWrapper, DayWrapper } from "./Day.styles";


export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? true : false;
  }
  return (
    <DayWrapper>
      {rowIdx === 0 && <Heading>{day.format("ddd").toUpperCase()}</Heading>}
      <DayDateWrapper active={getCurrentDayClass()}>
        {day.format("DD")}
      </DayDateWrapper>
      <ClickableWrapper
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </ClickableWrapper>
    </DayWrapper>
  );
}
