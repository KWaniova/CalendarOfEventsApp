import styled, { css } from 'styled-components';
import { color, TextColorProps, space, SpaceProps } from 'styled-system';

export const CheckboxInput = styled.input`
  cursor: inherit;
  position: absolute;
  opacity: 0;
  width: inherit;
  height: inherit;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  z-index: 2;
`;

interface Props {
  disabled: boolean;
}

export const CheckboxContainer = styled.span<
  TextColorProps & SpaceProps & Props
>`
  cursor: pointer;
  position: relative;
  width: 16px;
  height: 16px;

  ${props =>
    props.disabled &&
    css`
      cursor: default;
    `}
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  ${color}
  ${space}
`;
