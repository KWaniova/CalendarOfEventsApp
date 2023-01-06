import { useState, useContext, useEffect } from "react";

import CalendarHeader from "src/components/CalendarHeader/CalendarHeader";
import { getMonth } from "src/utils/getMonth";

import GlobalContext from "src/context/GlobalContext";
import Month from "src/components/Month";
import dayjs from "dayjs";
import Icon from "src/components/icon";
import { ICON_TYPE } from "src/components/icon/icon";
import { Heading, Text } from "src/components/Typography/Typography";
import { useTheme } from "styled-components";
import styled from "styled-components";

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
  background-color: ${({ theme }) => theme.colors.brandQuaternary};
`;

export default function Calendar() {
  const theme = useTheme();
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setMonthIndex, setReload } = useContext(GlobalContext);

  useEffect(() => {
    setReload(true);
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
  const calendarHeader = <CalendarHeader />;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {calendarHeader}
      <div
        style={{
          width: "100%",
          flexGrow: 1,
          overflow: "scroll",
          display: "flex",
        }}
      >
        <Month month={currenMonth} />
      </div>
      <FooterWrapper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: "100%",
            cursor: "pointer",
            backgroundColor: theme.colors.brandPrimary,
          }}
          onClick={handleReset}
        >
          <Text fontSize={16} color={"white"}>
            Current month
          </Text>
        </div>
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
        <Heading fontSize={25}>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </Heading>
      </FooterWrapper>
    </div>
  );
}
