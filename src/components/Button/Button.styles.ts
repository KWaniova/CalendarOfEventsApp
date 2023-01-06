import { motion } from "framer-motion";
import styled from "styled-components";
import {
  space,
  SpaceProps,
  ColorProps,
  variant,
  color,
  LayoutProps,
  layout,
} from "styled-system";

const ButtonStyled = styled(motion.button)<
  SpaceProps & ColorProps & LayoutProps
>`
  display: flex;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.m};
  padding-left: ${({ theme }) => theme.space.normal};
  padding-right: ${({ theme }) => theme.space.normal};
  padding-bottom: ${({ theme }) => theme.space.small};
  padding-top: ${({ theme }) => theme.space.small};

  border-radius: ${({ theme }) => theme.radii.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  ${variant({
    variants: {
      primary: {
        color: "white",
        backgroundColor: "brandPrimary",
      },
      secondary: {
        color: "brandPrimary",
        backgroundColor: "brandTertiary",
      },
      danger: {
        color: "white",
        backgroundColor: "danger",
      },
      inverse: {
        color: "bodyText",
        backgroundColor: "info",
      },
      light: {
        color: "bodyText",
        backgroundColor: "white",
      },
      outline: {
        color: "bodyText",
        backgroundColor: "transparent",
        borderWidth: "0.0625rem",
        borderStyle: "solid",
        borderColor: "separator",
      },
      disabled: {
        backgroundColor: "graySecondary",
        color: "white",
        "&:hover": {
          cursor: "default",
          // border-color: ${({ theme }) => theme.colors.muted};
        },
      },
    },
  })}
  ${layout}
  ${space}
  ${color}
`;

export default ButtonStyled;
