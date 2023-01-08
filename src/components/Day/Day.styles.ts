// @ts-nocheck

import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { color, ColorProps } from "styled-system";

export const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  min-height: 100px;
  align-items: center;
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.brandTertiary};
  }
  border: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
  border-radius: 5px;
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

type DayWrapperProps = {
  active: boolean;
};

export const DayDateWrapper = styled.div<DayWrapperProps>`
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
export const DayEventWrapper = styled(motion.button)<IProps & ColorProps>`
  display: flex;
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
  cursor: pointer;
  font-size: 12px;
  border: 2px solid ${({ theme }) => theme.colors.emotionsGreen};

  ${({ friendEvent }) =>
    friendEvent &&
    css`
      background-color: ${({ theme }) => theme.colors.emotionsNavy};
      border: 2px solid ${({ theme }) => theme.colors.brandPrimary};
    `}

  ${color}
`;
