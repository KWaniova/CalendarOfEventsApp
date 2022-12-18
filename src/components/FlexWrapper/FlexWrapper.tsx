import styled from "styled-components";
import { flex, FlexProps } from "styled-system";

export const FlexWrapper = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
  ${flex}
`;
