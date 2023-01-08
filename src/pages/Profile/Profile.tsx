import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { motion } from "framer-motion";

import { ProfileDataType } from "./ProfileTemplate";
import GlobalContext from "src/context/GlobalContext";
import ProfileLayout from "../../components/ProfileLayout/ProfileLayout";
import { FlexWrapper } from "src/components/FlexWrapper/FlexWrapper";
import { theme } from "src/styles/theme";
import { Text } from "src/components/Typography/Typography";
import Icon, { ICON_TYPE } from "src/components/icon/icon";
import { useModalContext } from "src/context/ModalContext/Modal";
import EditUserProfile from "../UserProfile/EditUserProfile";

import { ME_QUERY } from "src/api/queries";

const AvatarWrapper = styled(motion.div)`
  border: 5px solid ${theme.colors.brandSecondary};
  height: 180px;
  width: 180px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: ${theme.space.normal};
  margin-top: -90px;
`;

const InnerAvatarWrapper = styled(AvatarWrapper)`
  border: 0px solid ${theme.colors.brandSecondary};
  height: 170px;
  width: 170px;
  background-color: ${theme.colors.white};
  font-size: 60px;
  font-weight: 700;
  margin: 0 auto;
  color: ${theme.colors.brandPrimary};
  backgroundcolor: ${theme.colors.brandQuaternary};
`;

export type DataType = {
  me: ProfileDataType;
};

const Profile: React.FC = () => {
  const { auth } = useContext(GlobalContext);
  const { data, loading, error } = useQuery<DataType>(ME_QUERY, {
    variables: { auth: auth.token },
  });

  const { show } = useModalContext();
  if (loading)
    return (
      <ProfileLayout title="Users List">
        <div />
      </ProfileLayout>
    );
  if (error) return <pre>{error.message}</pre>;
  if (!data) return <pre>{"No data"}</pre>;

  const showEditModal = () => {
    auth.userId &&
      show(
        <EditUserProfile
          userID={auth.userId}
          first_name={data.me.firstName}
          last_name={data.me.lastName}
          email={data.me.email}
        />
      );
    console.log("show edit modal");
  };
  return (
    <ProfileLayout title="User profile">
      <FlexWrapper style={{ width: "100%" }} flexDirection={"column"}>
        <FlexWrapper
          style={{
            width: "100%",
            height: 180,
            alignItems: "flex-end",
            backgroundColor: theme.colors.brandPrimary,
            padding: theme.space.small,
          }}
        >
          <Icon
            onClick={showEditModal}
            type={ICON_TYPE.EDIT}
            fill="white"
            height={40}
            width={40}
          />
        </FlexWrapper>
        <FlexWrapper
          style={{
            flexGrow: 1,
            width: "100%",
            backgroundColor: theme.colors.white,
            alignItems: "center",
          }}
        >
          <AvatarWrapper whileHover={{ scale: 1.03 }}>
            <InnerAvatarWrapper>
              {data.me.firstName[0]}
              {data.me.lastName[0]}
            </InnerAvatarWrapper>
          </AvatarWrapper>
          <FlexWrapper style={{ width: "100%", paddingLeft: 50 }}>
            <Text fontSize={18} color="graySecondary" mt="normal">
              Name:
            </Text>
            <Text fontSize={18} mb="normal">
              {data.me.firstName} {data.me.lastName}{" "}
            </Text>

            <Text fontSize={18} color="graySecondary" mt="normal">
              E-mail:
            </Text>
            <Text fontSize={18} mb="normal">
              {data.me.email}
            </Text>
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </ProfileLayout>
  );
};

export default Profile;
