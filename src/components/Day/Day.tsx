// @ts-nocheck

import dayjs from "dayjs";
import { useContext, useState, useEffect } from "react";
import { useModalContext } from "src/context/ModalContext/Modal";
import GlobalContext from "../../context/GlobalContext";
import CreateEventModal from "../CreateEventModalContent/CreateEventModalContent";

import { Heading } from "../Typography/Typography";
import {
  ClickableWrapper,
  DayDateWrapper,
  DayEventWrapper,
  DayWrapper,
} from "./Day.styles";

import { EventType } from "src/types/Event";

export default function Day({ day, rowIdx }: { day: string; rowIdx: number }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  const myID = JSON.parse(localStorage.getItem("auth") || "{}").userId;
  useEffect(() => {
    const events = filteredEvents?.filter((evt: EventType) => {
      return (
        evt.from <= day.format("YYYY-MM-DDT23:59") &&
        evt.to >= day.format("YYYY-MM-DDT00:00")
      );
    });
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? true : false;
  }

  const { show } = useModalContext();

  return (
    <DayWrapper>
      {rowIdx === 0 && (
        <Heading mt={5}>{day.format("ddd").toUpperCase()}</Heading>
      )}
      <DayDateWrapper active={getCurrentDayClass()}>
        {day.format("DD")}
      </DayDateWrapper>
      <ClickableWrapper
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
          show(<CreateEventModal />);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <DayEventWrapper
            friendEvent={myID !== evt.userId}
            key={idx}
            bg={
              evt.type === "PRIVATE" ? "companionQuaternary" : "brandQuaternary"
            }
            onClick={() => {
              setSelectedEvent(evt);
            }}
          >
            {evt.title}
          </DayEventWrapper>
        ))}
      </ClickableWrapper>
    </DayWrapper>
  );
}
