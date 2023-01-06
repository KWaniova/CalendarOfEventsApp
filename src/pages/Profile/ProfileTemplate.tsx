////@ts-nocheck

import { ReactNode } from "react";
import { FC } from "react";
import Icon, { ICON_TYPE } from "src/components/icon/icon";
import { useTheme } from "styled-components";

// import { PanelBody } from 'components/atoms/Panel/Panel';

import { PanelBody, PanelWrapper } from "../../components/Panel/Panel";
import { Heading, Text } from "../../components/Typography/Typography";

export type ProfileDataType = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

//TODO: refactor

interface IProps {
  data: ProfileDataType;
  close?: () => void;
  children?: ReactNode;
}

const ProfileTemplate: FC<IProps> = ({ data, close, children }) => {
  const theme = useTheme();

  return (
    <PanelWrapper>
      <PanelBody
        flexDirection={"column"}
        noRadius
        width={350}
        pt={20}
        pr={50}
        pl={50}
        style={{
          display: "flex",
          minHeight: 450,
          borderRadius: 10,
          boxShadow: `1px 1px 1px 1px ${theme.colors.grayQuaternary} `,
        }}
      >
        <Heading
          style={{
            borderBottom: `1px solid ${theme.colors.grayQuaternary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          fontSize={20}
          mb="normal"
          pb="small"
        >
          Connection detail
          {close && (
            <Icon
              style={{ cursor: "pointer" }}
              onClick={async () => {
                close();
              }}
              type={ICON_TYPE.CLOSE}
            />
          )}
        </Heading>
        <Text color="graySecondary" mt="normal">
          First name:
        </Text>
        <Text mb="normal">{data.firstName}</Text>
        <Text color="graySecondary" mt="normal">
          Last name:
        </Text>
        <Text mb="normal">{data.lastName}</Text>

        <Text color="graySecondary" mt="normal">
          E-mail:
        </Text>
        <Text mb="normal">{data.email}</Text>
        {children}
      </PanelBody>
    </PanelWrapper>
  );
};

export default ProfileTemplate;
