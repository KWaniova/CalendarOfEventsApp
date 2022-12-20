import styled, { css } from 'styled-components';
import { space, SpaceProps, ColorProps, color } from 'styled-system';

const Input = styled.input<SpaceProps & ColorProps>`
  ${space}

  background-color: ${({ theme }) => theme.colors.white};

  font-size: ${({ theme }) => theme.fontSizes.normal};
  box-sizing: border-box;
  color: inherit;
  padding: ${({ theme }) => `${theme.space.small} ${theme.space.normal}`};
  transition: 0.2s linear all;

  border: ${({ theme }) => `0.0625rem solid ${theme.colors.formElementBorder}`};
  border-radius: ${({ theme }) => theme.radii.small};
  &:hover {
    border-color: ${({ theme }) => theme.colors.muted};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      border-color: ${({ theme }) => theme.colors.grayTertiary};
      color: ${({ theme }) => theme.colors.graySecondary};
      &:hover {
        border-color: ${({ theme }) => theme.colors.grayTertiary};
      }
    `}

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.colors.muted};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${({ theme }) => theme.colors.muted};
  }

  ${color}
`;

export default Input;
