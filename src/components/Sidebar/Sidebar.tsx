import React from "react";

import styled from "styled-components";
// import CreateEventButton from "../CreateEventButton/CreateEventButton";

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.normal};
  margin-right: ${({ theme }) => theme.space.normal};
  border-right: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
  width: 300px;
`;

export default function Sidebar() {
  return (
    <Wrapper>
      {/* <CreateEventButton /> */}
      {/* <Labels /> */}
    </Wrapper>
  );
}
