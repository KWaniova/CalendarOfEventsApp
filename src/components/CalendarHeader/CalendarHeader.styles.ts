import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  padding: ${({ theme }) => theme.space.normal};
  // margin-bottom: ${({ theme }) => theme.space.normal};
  background: ${({ theme }) => theme.colors.brandQuaternary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
`;
