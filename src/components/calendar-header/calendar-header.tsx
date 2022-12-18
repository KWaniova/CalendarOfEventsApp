import { useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";
import { HeaderWrapper } from "./calendar-header.styles";
import { Heading } from "../Typography/Typography";
import Button from "../Button/Button";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
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
  return (
    <HeaderWrapper>
      <Heading
        pr={"normal"}
        fontSize={25}
        color="graySecondary"
        fontWeight={300}
      >
        Calendar
      </Heading>
      <Button mr="normal" bg="brandSecondary" onClick={handleReset}>
        Today
      </Button>

      <Button mr="normal" bg="brandPrimary" onClick={handlePrevMonth}>
        Prev month
      </Button>
      <Button mr="normal" bg="brandPrimary" onClick={handleNextMonth}>
        Next month
      </Button>

      <Heading fontSize={25}>
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </Heading>
    </HeaderWrapper>
  );
};

export default CalendarHeader;
