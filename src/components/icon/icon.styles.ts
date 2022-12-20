import type { SVGProps } from "react";
import styled, { css } from "styled-components";
import {
  space,
  color,
  position,
  layout,
  SpaceProps,
  ColorProps,
  PositionProps,
  LayoutProps,
} from "styled-system";

export type IconStylesProps =
  | {
      width?: number | string;
      height?: number | string;
    } & SpaceProps &
      ColorProps &
      PositionProps &
      LayoutProps &
      SVGProps<SVGElement>;

const IconStyles = styled.svg<IconStylesProps>`
  ${space}
  ${color}
  ${position}
  ${layout}

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}

  width: 18px;
  height: 18px;

  ${({ width }) =>
    width &&
    css`
      width: ${typeof width === "string" ? width : `${width}px`};
      min-width: ${typeof width === "string" ? width : `${width}px`};
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${typeof height === "string" ? height : `${height}px`};
    `}
    
  ${({ opacity }) =>
    opacity &&
    css`
      opacity: ${opacity};
    `}
`;

export default IconStyles;
