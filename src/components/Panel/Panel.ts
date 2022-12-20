import styled, { css } from 'styled-components';
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  space,
  SpaceProps,
  LayoutProps,
} from 'styled-system';

interface IPanelWrapperProps {
  flexible?: boolean;
  minHeight?: number;
}

interface IPanelBodyProps {
  disableTopSeparator?: boolean;
  disableBottomSeparator?: boolean;
  minHeight?: number;
  noRadius?: boolean;
}

export const PanelWrapper = styled.div<
  IPanelWrapperProps & SpaceProps & LayoutProps & FlexboxProps
>`
  ${space}

  border-radius: ${({ theme }) => theme.radii.large};

  ${props =>
    props.flexible === true &&
    css`
      flex-direction: column;
      display: flex;
      flex-shrink: 1;
      flex-grow: 1;
      min-height: 0;
      max-height: max-content;

      ${PanelBody} {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: max-content;
        flex-shrink: 1;
      }
    `};

  ${flexbox}
  ${layout}
`;

export const PanelHeader = styled.div<ColorProps>`
  ${space}

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.space.normal} ${theme.space.large}`};
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.separator};

  &:last-child {
    border-bottom-left-radius: ${({ theme }) => theme.radii.large};
    border-bottom-right-radius: ${({ theme }) => theme.radii.large};
  }

  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.radii.large};
    border-top-right-radius: ${({ theme }) => theme.radii.large};
  }

  background: ${({ theme }) => theme.colors.white};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  ${color};
`;

export const PanelBody = styled.div<
  IPanelBodyProps & ColorProps & SpaceProps & FlexboxProps & LayoutProps
>`
  border-bottom: ${({ theme, disableBottomSeparator }) =>
    disableBottomSeparator
      ? 'none'
      : `0.0625rem solid ${theme.colors.separator}`};

  padding: ${({ theme }) => `${theme.space.large} ${theme.space.large}`};
  min-height: ${({ minHeight }) => minHeight || 0};

  ${props =>
    !props.noRadius
      ? css`
          &:last-child {
            border-bottom-left-radius: ${({ theme }) => theme.radii.large};
            border-bottom-right-radius: ${({ theme }) => theme.radii.large};
          }

          &:first-child {
            border-top-left-radius: ${({ theme }) => theme.radii.large};
            border-top-right-radius: ${({ theme }) => theme.radii.large};
          }
        `
      : css``};

  background: ${({ theme }) => theme.colors.navBackgroundActive};
  ${color}
  ${layout}
  ${space}
  ${flexbox}
`;

export const PanelFooter = styled.div<ColorProps & FlexboxProps>`
  ${space}

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-left-radius: ${({ theme }) => theme.radii.large};
  border-bottom-right-radius: ${({ theme }) => theme.radii.large};
  padding: ${({ theme }) => `${theme.space.normal} ${theme.space.large}`};

  background: ${({ theme }) => theme.colors.white};

  ${color}
  ${flexbox}
`;
