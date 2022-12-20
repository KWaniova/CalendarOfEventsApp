// @ts-nocheck

import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import styled from "styled-components";
import { Heading } from "../Typography/Typography";
import Icon, { ICON_TYPE } from "../icon/icon";

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.small};
  background-color: ${({ theme }) => theme.colors.brandQuaternary};
  border-radius: 12px;
  cursor: pointer;
`;

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <ButtonWrapper bg="brandQuaternary" onClick={() => setShowEventModal(true)}>
      <Icon ml={5} type={ICON_TYPE.PLUS} />
      <Heading ml={20} fontSize={20} fontWeight={400}>
        Create
      </Heading>
    </ButtonWrapper>
  );
}
