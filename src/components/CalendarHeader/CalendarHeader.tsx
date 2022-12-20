import { HeaderWrapper } from "./CalendarHeader.styles";
import { Heading } from "../Typography/Typography";
import Icon, { ICON_TYPE } from "../icon/icon";
import { ROUTE_NAMES } from "src/App";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
const CalendarHeader = ({ children }: Props) => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Heading
        pr={"normal"}
        fontSize={25}
        color="graySecondary"
        fontWeight={300}
        mr="normal"
        style={{ borderRight: "1px solid gray", cursor: "pointer" }}
        onClick={() => navigate(ROUTE_NAMES.calendar)}
      >
        Calendar app
      </Heading>
      {children}
      <Icon
        onClick={() => navigate(ROUTE_NAMES.profile)}
        type={ICON_TYPE.USER_FILLED}
        fill="brandPrimary"
        height={40}
        width={40}
      />
    </HeaderWrapper>
  );
};

export default CalendarHeader;
