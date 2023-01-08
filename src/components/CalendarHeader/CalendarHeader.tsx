import { HeaderTitleWrapper, HeaderWrapper } from "./CalendarHeader.styles";
import { Heading } from "../Typography/Typography";
import Icon, { ICON_TYPE } from "../icon/icon";
import { ROUTE_NAMES } from "src/App";
import { useNavigate } from "react-router-dom";
import { FlexWrapper } from "../FlexWrapper/FlexWrapper";
import { useTheme } from "styled-components";
import Button from "../Button/Button";
import { useContext } from "react";
import GlobalContext from "src/context/GlobalContext";

interface Props {
  sidebar?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}
const CalendarHeader = ({ sidebar, breadcrumb }: Props) => {
  const navigate = useNavigate();
  const { logOut } = useContext(GlobalContext);
  const theme = useTheme();
  return (
    <FlexWrapper flexDirection={"row"}>
      <FlexWrapper
        style={{
          borderRight: sidebar
            ? `1px solid ${theme.colors.grayTertiary}`
            : "1px",
        }}
      >
        <HeaderWrapper>
          <Heading
            pr={"normal"}
            fontSize={25}
            color="graySecondary"
            fontWeight={300}
            mr="normal"
            style={{
              cursor: "pointer",
              width: 180,
            }}
            onClick={() => navigate(ROUTE_NAMES.calendar)}
          >
            Calendar app
          </Heading>
        </HeaderWrapper>
        {sidebar}
      </FlexWrapper>
      <HeaderTitleWrapper>
        <div style={{ flexGrow: 1 }}>{breadcrumb}</div>
        <Icon
          onClick={() => navigate(ROUTE_NAMES.profile)}
          type={ICON_TYPE.USER_FILLED}
          fill="brandPrimary"
          height={40}
          width={40}
        />
        <Button onClick={logOut} ml="normal" variant="primary">
          Log out
        </Button>
      </HeaderTitleWrapper>
    </FlexWrapper>
  );
};

export default CalendarHeader;
