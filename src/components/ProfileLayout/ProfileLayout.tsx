import { ReactNode, useEffect, useState } from "react";
import { HeightProps } from "styled-system";
import styled from "styled-components";

import { ProfileDataType } from "../../pages/Profile/ProfileTemplate";
import CalendarHeader from "src/components/CalendarHeader/CalendarHeader";
import { Heading } from "src/components/Typography/Typography";
import { FlexWrapper } from "src/components/FlexWrapper/FlexWrapper";
import Sidebar from "src/components/Sidebar/Sidebar";
import { FooterWrapper } from "../../pages/Calendar/Calendar";

const Wrapper = styled.div<HeightProps>`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
`;

export type DataType = {
  me: ProfileDataType;
};

type IProps = {
  title: string;
  children: ReactNode;
};

const ProfileLayout = ({ children, title }: IProps) => {
  const [pageHeight, setPageHeight] = useState(900);

  useEffect(() => {
    setPageHeight(window.innerHeight);
  }, []);

  const calendarHeader = (
    <CalendarHeader
      breadcrumb={
        <Heading style={{ flexGrow: 1 }} fontSize={25}>
          {title}
        </Heading>
      }
    />
  );

  return (
    <Wrapper height={pageHeight}>
      {calendarHeader}
      <FlexWrapper
        style={{ flexGrow: 1, overflow: "hidden" }}
        flexDirection={"row"}
      >
        <Sidebar />
        <FlexWrapper
          style={{ flexGrow: 1, overflow: "hidden" }}
          flexDirection={"row"}
        >
          {children}
        </FlexWrapper>
      </FlexWrapper>
      <FooterWrapper />
    </Wrapper>
  );
};

export default ProfileLayout;
