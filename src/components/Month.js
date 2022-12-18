import React from "react";
import Day from "./Day/Day";

import styled from 'styled-components';

const GridWrapperRows = styled.div`
display: grid;
width: 100%;
height: 100%;
  grid-template-columns: 14% 14% 14% 14% 14% 14% 14%; 
  // grid-gap: 1rem;
`

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
