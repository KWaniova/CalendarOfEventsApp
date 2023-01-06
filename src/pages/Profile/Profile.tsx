import React, { useContext } from "react";

import { ProfileDataType } from "./ProfileTemplate";
import { gql, useQuery } from "@apollo/client";
import GlobalContext from "src/context/GlobalContext";
import ProfileLayout from "../../components/ProfileLayout/ProfileLayout";
import { FlexWrapper } from "src/components/FlexWrapper/FlexWrapper";
import { theme } from "src/styles/theme";
import { Text } from "src/components/Typography/Typography";
import Icon, { ICON_TYPE } from "src/components/icon/icon";
import { useModalContext } from "src/context/ModalContext/Modal";
import EditUserProfile from "../UserProfile/EditUserProfile";

const ME_QUERY = gql`
  query Me($auth: String!) {
    me(auth: $auth) {
      id
      firstName
      lastName
      email
    }
  }
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
    debugger;
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
          <div
            style={{
              border: `5px solid ${theme.colors.brandSecondary}`,
              marginTop: -90,
              height: 180,
              width: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 170,
                width: 170,
                fontSize: 60,
                fontWeight: 700,
                color: theme.colors.brandPrimary,
                borderRadius: 100,
                backgroundColor: theme.colors.brandQuaternary,
              }}
            >
              {data.me.firstName[0]}
              {data.me.lastName[0]}
            </div>
          </div>
          <FlexWrapper style={{ width: "100%", paddingLeft: 50 }}>
            <Text fontSize={22} color="graySecondary" mt="normal">
              Name:
            </Text>
            <Text fontSize={22} mb="normal">
              {data.me.firstName} {data.me.lastName}{" "}
            </Text>

            <Text fontSize={22} color="graySecondary" mt="normal">
              E-mail:
            </Text>
            <Text fontSize={22} mb="normal">
              {data.me.email}
            </Text>
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </ProfileLayout>
  );
};

export default Profile;
