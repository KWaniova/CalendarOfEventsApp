import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { client } from "src";
import {
  ConnectionType,
  GET_CONNECTION_REQUESTS,
  GET_CONNECTION_REQUESTS_SENT,
} from "src/api/queries";
import Button from "src/components/Button/Button";
import { FlexWrapper } from "src/components/FlexWrapper/FlexWrapper";
import Icon from "src/components/icon";
import { ICON_TYPE } from "src/components/icon/icon";

import ProfileLayout from "src/components/ProfileLayout/ProfileLayout";
import { Heading, Text } from "src/components/Typography/Typography";
import UserDataPanel from "src/components/UserDataPanel/UserDataPanel";
import GlobalContext from "src/context/GlobalContext";
import styled, { useTheme } from "styled-components";
import { ConnectionItemWrapper } from "../UsersList/UsersList";
import useConnectionRequestActions from "./useConnectionRequestActions";

const TitleWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayQuaternary};
  padding-bottom: 10px;
  margin-bottom: 20px;
  padding: 10px;
`;
export type DataTypeReq = {
  connectionRequests: { connections?: ConnectionType[] };
};

export type DataTypeSent = {
  connectionRequestsSent: { connections?: ConnectionType[] };
};

type UserPanelType = "req" | "req_sent";
const ConnectionRequests: React.FC = () => {
  const { auth } = useContext(GlobalContext);
  const { data: connReq, loading } = useQuery<DataTypeReq>(
    GET_CONNECTION_REQUESTS,
    {
      variables: { auth: auth.token },
    }
  );
  const { data: connSent } = useQuery<DataTypeSent>(
    GET_CONNECTION_REQUESTS_SENT,
    {
      variables: { auth: auth.token },
    }
  );

  const theme = useTheme();
  const [userPanel, showUserPanel] = useState<null | {
    userID: string;
    type: UserPanelType;
    connectionID: string;
  }>(null);

  const onSuccess = () => {
    client.resetStore();
    showUserPanel(null);
  };

  const { acceptConnectionRequest, rejectConnectionRequest } =
    useConnectionRequestActions({
      onSuccess,
    });
  if (loading)
    return (
      <ProfileLayout title="Users List">
        <div />
      </ProfileLayout>
    );
  const showConnectionProfile = (
    userID: string,
    type: UserPanelType,
    connectionID: string
  ) => {
    showUserPanel({ userID, type, connectionID });
  };

  return (
    <ProfileLayout title="Connection requests">
      <div style={{ width: "100%", display: "flex" }}>
        <FlexWrapper style={{ flexGrow: 1, width: "100%" }}>
          <FlexWrapper style={{ flex: 1, width: "100%" }}>
            <TitleWrapper>
              <Heading
                style={{
                  borderBottom: `1px solid ${theme.colors.grayQuaternary}`,
                }}
                fontSize={20}
                mt="normal"
                mb="normal"
                pb="small"
              >
                Connections requests
              </Heading>
              <Text>
                This is list off connection requests you have received.
              </Text>
            </TitleWrapper>
            <div style={{ overflow: "auto", padding: 10 }}>
              {connReq &&
                connReq?.connectionRequests.connections?.map((item) => (
                  <ConnectionItemWrapper
                    active={item.userId === userPanel?.userID}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      showConnectionProfile(item.userId, "req", item.id)
                    }
                  >
                    <Icon mr={10} type={ICON_TYPE.USER} />
                    <Text fontWeight={500}>
                      {item.firstName} {item.lastName}
                    </Text>
                  </ConnectionItemWrapper>
                ))}
            </div>
          </FlexWrapper>
          <FlexWrapper style={{ flex: 1, width: "100%" }}>
            <TitleWrapper>
              <Heading
                style={{
                  borderBottom: `1px solid ${theme.colors.grayQuaternary}`,
                }}
                fontSize={20}
                mt="normal"
                mb="normal"
                pb="small"
              >
                Connections requests sent
              </Heading>
              <Text>This is list off connection requests you have sent.</Text>
            </TitleWrapper>
            <div style={{ overflow: "auto", padding: 10 }}>
              {connSent &&
                connSent?.connectionRequestsSent.connections?.map((item) => (
                  <ConnectionItemWrapper
                    active={item.userId === userPanel?.userID}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      showConnectionProfile(item.userId, "req_sent", item.id)
                    }
                  >
                    <Icon mr={10} type={ICON_TYPE.USER} />
                    <Text fontWeight={500}>
                      {item.firstName} {item.lastName}
                    </Text>
                  </ConnectionItemWrapper>
                ))}
            </div>
          </FlexWrapper>
        </FlexWrapper>

        <UserDataPanel id={userPanel?.userID}>
          <div
            style={{
              display: "flex",
              padding: 8,
              flexGrow: 1,
              alignItems: "flex-end",
            }}
          >
            {userPanel?.type === "req_sent" && (
              <Button
                disabled
                ml={"small"}
                mr="small"
                variant="disabled"
                style={{ flex: 1, height: 40 }}
                onClick={() => {}}
              >
                Connection request sent
              </Button>
            )}
            {userPanel?.type === "req" && (
              <>
                <Button
                  ml={"small"}
                  mr="small"
                  variant="primary"
                  style={{ flex: 1, height: 40 }}
                  onClick={() =>
                    rejectConnectionRequest(userPanel?.connectionID)
                  }
                >
                  Decline
                </Button>
                <Button
                  ml={"small"}
                  mr="small"
                  variant="primary"
                  style={{ flex: 1, height: 40 }}
                  onClick={() =>
                    acceptConnectionRequest(userPanel?.connectionID)
                  }
                >
                  Accept
                </Button>
              </>
            )}
          </div>
        </UserDataPanel>
      </div>
    </ProfileLayout>
  );
};

export default ConnectionRequests;
