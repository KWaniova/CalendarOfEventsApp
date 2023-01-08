import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { client } from "src";
import { CONNECTION_ACTIONS } from "src/api/mutations";
import { Connections as ConnType, GET_MY_CONNECTIONS } from "src/api/queries";
import Button from "src/components/Button/Button";
import { FlexWrapper } from "src/components/FlexWrapper/FlexWrapper";
import Icon from "src/components/icon";
import { ICON_TYPE } from "src/components/icon/icon";

import ProfileLayout from "src/components/ProfileLayout/ProfileLayout";
import { Heading, Text } from "src/components/Typography/Typography";
import UserDataPanel from "src/components/UserDataPanel/UserDataPanel";
import GlobalContext from "src/context/GlobalContext";
import { useTheme } from "styled-components";
import { ConnectionItemWrapper } from "../UsersList/UsersList";

const Connections: React.FC = () => {
  const { auth } = useContext(GlobalContext);
  const { data, loading, error } = useQuery<ConnType>(GET_MY_CONNECTIONS, {
    variables: { auth: auth.token },
  });
  const [actions] = useMutation(CONNECTION_ACTIONS);
  const theme = useTheme();

  const [userData, setUserData] = useState<null | {
    userID: string;
    connectionID: string;
  }>(null);

  if (loading)
    return (
      <ProfileLayout title="Users List">
        <div />
      </ProfileLayout>
    );
  if (error) return <pre>{error.message}</pre>;
  if (!data) return <pre>{"No data"}</pre>;

  const showConnectionProfile = (userID: string, connectionID: string) => {
    setUserData({ userID, connectionID });
  };

  const disconnect = async (connectionID: string) => {
    await actions({
      variables: {
        auth: auth.token,
        connectionId: connectionID,
        action: "DISCONNECT",
      },
    }).then(() => {
      client.resetStore();
      setUserData(null);
    });
  };

  return (
    <ProfileLayout title="My connections">
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
              My connections
            </Heading>
            <Text>
              This is list off your connections. You can see their profile here.
            </Text>
          </div>
          <div style={{ overflow: "auto", padding: 10 }}>
            {data.connections.connections.map((item) => (
              <ConnectionItemWrapper
                active={item.userId === userData?.userID}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => showConnectionProfile(item.userId, item.id)}
              >
                <Icon mr={10} type={ICON_TYPE.USER} />
                <Text fontWeight={500}>
                  {item.firstName} {item.lastName}
                </Text>
              </ConnectionItemWrapper>
            ))}
          </div>
        </FlexWrapper>
        <UserDataPanel id={userData?.userID}>
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
              onClick={() =>
                userData?.connectionID && disconnect(userData?.connectionID)
              }
            >
              Disconnect
            </Button>
          </div>
        </UserDataPanel>
      </div>
    </ProfileLayout>
  );
};

export default Connections;
