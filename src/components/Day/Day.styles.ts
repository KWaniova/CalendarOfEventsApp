// @ts-nocheck

import styled, { css } from "styled-components";
import { color, ColorProps } from "styled-system";

export const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  min-height: 100px;
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
  overflow: scroll;
`;

export const DayDateWrapper = styled.div`
  padding: 5px;
  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.colors.brandPrimary};
      color: white;
      border-radius: 100%;
      margin: 5px;
    `}
`;

interface IProps {
  friendEvent: boolean;
}
export const DayEventWrapper = styled.div<IProps & ColorProps>`
  display: flex;
  // justify-content: center;
  padding: 3px;
  width: 80%;
  max-width: 80%;
  min-height: 26px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 5px;
  font-size: 12px;
  border: 2px solid ${({ theme }) => theme.colors.emotionsGreen};

  ${({ friendEvent }) =>
    friendEvent &&
    css`
      background-color: ${({ theme }) => theme.colors.brandQuaternary};
      border: 2px solid ${({ theme }) => theme.colors.emotionsBlue};
    `}

  ${color}
`;
