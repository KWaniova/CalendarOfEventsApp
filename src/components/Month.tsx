// @ts-nocheck

import React from "react";

import styled from "styled-components";
import Day from "./Day/Day";

const GridWrapperRows = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
`;

export default function Month({ month }) {
  return (
    <GridWrapperRows>
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </GridWrapperRows>
  );
}
