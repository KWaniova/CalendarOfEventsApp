////@ts-nocheck

import React, { useContext, useEffect, useState } from "react";
import { HeightProps, height } from "styled-system";
import styled, { useTheme } from "styled-components";

import { AnimatePresence, motion } from "framer-motion";
import ProfileTemplate, { ProfileDataType } from "./ProfileTemplate";
import dayjs from "dayjs";
import Button from "src/components/Button/Button";
import CalendarHeader from "src/components/CalendarHeader/CalendarHeader";
import Icon from "src/components/icon";
import { ICON_TYPE } from "src/components/icon/icon";
import { Heading } from "src/components/Typography/Typography";
import { FlexWrapper } from "src/components/FlexWrapper/FlexWrapper";
import { gql, useQuery } from "@apollo/client";
import GlobalContext from "src/context/GlobalContext";
import { PanelBody } from "src/components/Panel/Panel";

const Wrapper = styled.div<HeightProps>`
  width: 100vw;
  height: 100vh;
`;

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
  const [pageHeight, setPageHeight] = useState(900);
  const theme = useTheme();

  useEffect(() => {
    setPageHeight(window.innerHeight);
  }, []);

  if (loading) return <>Loading...</>;
  if (error) return <pre>{error.message}</pre>;
  if (!data) return <pre>{"No data"}</pre>;

  const calendarHeader = (
    <CalendarHeader>
      <Heading style={{ flexGrow: 1 }} fontSize={25}>
        User profile
      </Heading>
    </CalendarHeader>
  );
  return (
    <Wrapper height={pageHeight}>
      {calendarHeader}
      <FlexWrapper flexDirection={"row"}>
        <ProfileTemplate data={data.me} />
        <div style={{ width: "100%" }}>
          <PanelBody
            flexDirection={"column"}
            noRadius
            width={"100%"}
            ml="normal"
            mr="normal"
            pt={20}
            pr={50}
            pl={50}
            style={{
              display: "flex",
              borderRadius: 10,
              border: `1px solid ${theme.colors.grayQuaternary}`,
            }}
          >
            <Heading
              style={{
                borderBottom: `1px solid ${theme.colors.grayQuaternary}`,
              }}
              fontSize={20}
              mb="normal"
              pb="small"
            >
              Connections
            </Heading>
          </PanelBody>

          <PanelBody
            flexDirection={"column"}
            noRadius
            width={"100%"}
            ml="normal"
            mt="normal"
            mr="normal"
            pt={20}
            pr={50}
            pl={50}
            style={{
              display: "flex",
              borderRadius: 10,
              border: `1px solid ${theme.colors.grayQuaternary}`,
            }}
          >
            <Heading
              style={{
                borderBottom: `1px solid ${theme.colors.grayQuaternary}`,
              }}
              fontSize={20}
              mb="normal"
              pb="small"
            >
              Connection requests
            </Heading>
          </PanelBody>
        </div>
      </FlexWrapper>
    </Wrapper>
  );
};

export default Profile;
