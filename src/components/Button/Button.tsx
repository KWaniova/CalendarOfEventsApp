import React, { FC } from "react";
import { LayoutProps, SpaceProps } from "styled-system";

import ButtonStyled from "./Button.styles";

type IProps = {
  variant?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  bg?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
  style?: any;
} & LayoutProps &
  SpaceProps;

const Button: FC<IProps> = ({ children, ...props }) => {
  return (
    <ButtonStyled
      whileHover={{ scale: !props.disabled ? 1.008 : 1 }}
      whileTap={{ scale: !props.disabled ? 0.98 : 1 }}
      {...props}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
