////@ts-nocheck

import { FC } from "react";
import { useTheme } from "styled-components";

// import { PanelBody } from 'components/atoms/Panel/Panel';

import {
  PanelBody,
  PanelHeader,
  PanelWrapper,
} from "../../components/Panel/Panel";
import { Heading, Text } from "../../components/Typography/Typography";
import { DataType } from "./Profile";

export type ProfileDataType = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

//TODO: refactor

interface IProps {
  data: ProfileDataType;
}

const ProfileTemplate: FC<IProps> = ({ data }) => {
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
          style={{ borderBottom: `1px solid ${theme.colors.grayQuaternary}` }}
          fontSize={20}
          mb="normal"
          pb="small"
        >
          Personal Information
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
      </PanelBody>
    </PanelWrapper>
  );
};

export default ProfileTemplate;
