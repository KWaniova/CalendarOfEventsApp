import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";

export const FlexWrapper = styled.div<FlexboxProps>`
  display: flex;
  flex-direction: column;
  ${flexbox}
`;
