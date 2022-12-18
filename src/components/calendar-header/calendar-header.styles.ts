import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  padding: ${({ theme }) => theme.space.normal};
  margin-bottom: ${({ theme }) => theme.space.normal};

  border-bottom: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
`;
