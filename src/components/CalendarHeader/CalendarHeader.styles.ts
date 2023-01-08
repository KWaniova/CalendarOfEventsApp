import styled from "styled-components";
import { Heading } from "../Typography/Typography";

export const HeaderTitleWrapper = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  padding: ${({ theme }) => theme.space.normal};
  background: ${({ theme }) => theme.colors.brandQuaternary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
`;

export const HeaderWrapper = styled(HeaderTitleWrapper)`
  &:hover {
    ${Heading} {
      color: ${({ theme }) => theme.colors.brandPrimary};
      font-weight: 500;
    }
  }
`;
