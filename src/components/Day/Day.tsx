// @ts-nocheck

import dayjs from "dayjs";
import { useContext, useState, useEffect } from "react";
import { useModalContext } from "src/context/ModalContext/Modal";
import GlobalContext from "../../context/GlobalContext";
import CreateEventModal from "../CreateEventModalContent/CreateEventModalContent";

import { Heading } from "../Typography/Typography";
import { ClickableWrapper, DayDateWrapper, DayWrapper } from "./Day.styles";

import styled from "styled-components";

const DayEventWrapper = styled.div`
  display: flex;
  // background-color: green;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 5px;
  border: 1px solid ${({ theme }) => theme.colors.graySecondary};
`;

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

  const { show, hide } = useModalContext();

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
          show(<CreateEventModal />);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <DayEventWrapper
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </DayEventWrapper>
        ))}
      </ClickableWrapper>
    </DayWrapper>
  );
}
