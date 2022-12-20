// @ts-nocheck

import styled, { css } from "styled-components";
import Input from "../Input/Input";
import { Text } from "../Typography/Typography";

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > ${Text} {
    margin-bottom: 3px;
    transition: 0.7s linear all;
  }

  & > ${Input} {
    width: 100%;
    ${(props) =>
      props.inputBorder &&
      css`
        border-color: red;
      `}
  }

  padding-bottom: 14px;
`;

export const EyeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormInputWrapper = styled.div`
  border-radius: ${({ theme }) => theme.radii.small};

  border: ${({ theme }) => `0.0625rem solid ${theme.colors.formElementBorder}`};
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.colors.graySecondary};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${({ theme }) => theme.colors.graySecondary};
  }

  transition: 0.2s linear all;

  padding-right: 8px;
  display: flex;
  flex-direction: row;
  &:hover {
    border-color: ${({ theme }) => theme.colors.graySecondary};
  }
  & > ${Input} {
    width: 100%;
    background-color: white;
    border: none;
  }
  align-items: center;
  justify-content: center;
  svg {
    margin-left: -4px;
  }
`;
