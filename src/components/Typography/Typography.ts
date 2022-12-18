import styled, { css } from "styled-components";
import {
  space,
  color,
  display,
  typography,
  ColorProps,
  DisplayProps,
  SpaceProps,
  TypographyProps,
} from "styled-system";

export const Heading = styled.h1<ColorProps & TypographyProps & SpaceProps>`
  color: ${({ theme }) => theme.colors.grayPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  ${color}
  ${space}
  ${typography}
`;

export const Link = styled.a<TypographyProps & SpaceProps>`
  ${space}
  ${typography}
  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;

      &:hover {
        text-decoration: none;
        color: ${(props) => props.theme.colors.brandPrimary};
      }
    `};
  ${(props) =>
    !props.onClick &&
    css`
      color: ${(props) => props.theme.colors.grayPrimary};
    `};
`;

export const Paragraph = styled.p<ColorProps & TypographyProps & SpaceProps>`
  ${color}
  ${space}
  ${typography}

  color: ${({ theme }) => theme.colors.bodyText};
`;

interface ITextProps {
  isSmall?: boolean;
  isMarked?: boolean;
  isMuted?: boolean;
}

export const Text = styled.span<
  ITextProps & ColorProps & DisplayProps & SpaceProps & TypographyProps
>`
  ${display}

  font-size: ${({ theme, isSmall }) =>
    isSmall ? theme.fontSizes.s : theme.fontSizes.normal};
  background-color: ${({ theme, isMarked }) =>
    isMarked ? theme.colors.warning : "none"};

  color: ${({ theme, isMuted }) => (isMuted ? theme.colors.muted : "none")};
  ${color}
  ${typography}
  ${space}
`;
