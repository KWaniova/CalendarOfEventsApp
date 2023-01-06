import React, { useContext, useState } from "react";

import { useQuery } from "@apollo/client";
import GlobalContext from "src/context/GlobalContext";
import ProfileLayout from "../../components/ProfileLayout/ProfileLayout";
import { GET_NOT_CONNECTED_USERS } from "src/api/queries";
import { FlexWrapper } from "src/components/FlexWrapper/FlexWrapper";
import Icon from "src/components/icon";
import { ICON_TYPE } from "src/components/icon/icon";
import { Heading, Text } from "src/components/Typography/Typography";
import styled, { useTheme } from "styled-components";
import { User } from "src/types/User";
import Button from "src/components/Button/Button";
import UserDataPanel from "src/components/UserDataPanel/UserDataPanel";
import { client } from "src";
import { ADD_CONNECTION } from "src/api/mutations";

export const ConnectionItemWrapper = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.space.normal};
  border-bottom: 1px solid ${({ theme }) => theme.colors.brandTertiary};
  // border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.brandQuaternary};
  }
`;

export type DataType = {
  getNotConnectedUsers?: User[];
};

const UsersList: React.FC = () => {
  const { auth } = useContext(GlobalContext);
  const { data, loading, error } = useQuery<DataType>(GET_NOT_CONNECTED_USERS, {
    variables: { auth: auth.token },
  });
  const theme = useTheme();

  const [userID, setUserID] = useState<null | string>(null);

  if (loading)
    return (
      <ProfileLayout title="Users List">
        <div />
      </ProfileLayout>
    );
  if (error) return <pre>{error.message}</pre>;
  if (!data) return <pre>{"No data"}</pre>;

  const showConnectionProfile = (userID: string) => {
    setUserID(userID);
  };

  const connectToUser = (userID: string) => {
    console.log("connect to user", userID);
    client
      .mutate({
        mutation: ADD_CONNECTION,
        variables: {
          auth: auth.token,
          targetUserId: userID,
        },
      })
      .then((res) => {
        client.resetStore();
        console.log("res", res);
        setUserID(null);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <ProfileLayout title="Users List">
      <div style={{ width: "100%", display: "flex" }}>
        <FlexWrapper style={{ flexGrow: 1, width: "100%" }}>
          <div
            style={{
              borderBottom: `1px solid ${theme.colors.grayQuaternary}`,
              paddingBottom: 10,
              marginBottom: 20,
              padding: 10,
            }}
          >
            <Heading
              style={{
                borderBottom: `1px solid ${theme.colors.grayQuaternary}`,
              }}
              fontSize={20}
              mt="normal"
              mb="normal"
              pb="small"
            >
              All users
            </Heading>
            <Text>
              This is list of all users in the system. You can click on any user
              to see their profile.
            </Text>
          </div>
          <div style={{ overflow: "auto", padding: 10 }}>
            {data?.getNotConnectedUsers?.map((item) => (
              <ConnectionItemWrapper
                onClick={() => showConnectionProfile(item.id)}
              >
                <Icon mr={10} type={ICON_TYPE.USER} />
                <Text fontWeight={500}>
                  {item.firstName} {item.lastName}
                </Text>
              </ConnectionItemWrapper>
            ))}
          </div>
        </FlexWrapper>
        <UserDataPanel id={userID}>
          <div
            style={{
              display: "flex",
              padding: 8,
              flexGrow: 1,
              alignItems: "flex-end",
            }}
          >
            <Button
              ml={"small"}
              mr="small"
              variant="primary"
              style={{ flex: 1, height: 40 }}
              onClick={() => userID && connectToUser(userID)}
            >
              Connect
            </Button>
          </div>
        </UserDataPanel>
      </div>
    </ProfileLayout>
  );
};

export default UsersList;
