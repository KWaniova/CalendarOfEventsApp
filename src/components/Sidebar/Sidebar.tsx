import React from "react";
import CreateEventButton from "../CreateEventButton";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import Labels from "../Labels";

import styled from "styled-components";

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.normal};
  margin-right: ${({ theme }) => theme.space.normal};
  border-right: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
`;

export default function Sidebar() {
  return (
    <Wrapper>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </Wrapper>
  );
}
