import styled, { useTheme } from "styled-components";
import dayjs from "dayjs";

import Month from "src/components/Month";
import Icon from "src/components/icon";
import { ICON_TYPE } from "src/components/icon/icon";
import { Heading, Text } from "src/components/Typography/Typography";
import { FlexWrapper } from "src/components/FlexWrapper/FlexWrapper";
import CalendarHeader from "src/components/CalendarHeader/CalendarHeader";

import useCalendar from "./useCalendar";

export default function Calendar() {
  const theme = useTheme();

  const {
    handleNextMonth,
    handlePrevMonth,
    handleReset,
    currenMonth,
    monthIndex,
  } = useCalendar();

  return (
    <FlexWrapper
      flexDirection="column"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <CalendarHeader />
      <FlexWrapper
        style={{
          width: "100%",
          flexGrow: 1,
          overflow: "scroll",
        }}
      >
        <Month month={currenMonth} />
      </FlexWrapper>
      <FooterWrapper>
        <FlexWrapper
          alignItems="center"
          justifyContent="center"
          style={{
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
        </FlexWrapper>
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
        <FlexWrapper
          flexDirection={"row"}
          style={{
            flexGrow: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Line />
          <Text ml="normal" mr="normal" color="graySecondary">
            Friend event
          </Text>
          <Line style={{ backgroundColor: theme.colors.emotionsGreen }} />
          <Text ml="normal" mr="normal" color="graySecondary">
            My event
          </Text>

          <Circle />
          <Text ml="normal" mr="normal" color="graySecondary">
            Private
          </Text>
          <Circle
            style={{
              backgroundColor: theme.colors.brandQuaternary,
            }}
          />
          <Text ml="normal" mr="normal" color="graySecondary">
            Public
          </Text>
        </FlexWrapper>
      </FooterWrapper>
    </FlexWrapper>
  );
}

const Line = styled.div`
  width: 20px;
  height: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.brandPrimary};
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.companionSecondary};
`;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
  background-color: ${({ theme }) => theme.colors.brandQuaternary};
`;
