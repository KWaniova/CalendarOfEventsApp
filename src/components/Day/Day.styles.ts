// @ts-nocheck

import styled, { css } from "styled-components";

export const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
`;

export const ClickableWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  height: 100%;
  width: 100%;
`;

// interface DayDateWrapperProps {
//   active: Boolean;
// }

export const DayDateWrapper = styled.div`
  padding: 5px;
  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.colors.brandPrimary};
      color: white;
      border-radius: 100%;
    `}
`;
