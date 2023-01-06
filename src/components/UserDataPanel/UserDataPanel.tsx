import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { useContext } from "react";
import { ApiUserType, GET_USER } from "src/api/queries";
import GlobalContext from "src/context/GlobalContext";
import { useTheme } from "styled-components";
import { Text } from "../Typography/Typography";

type UserDataPanelProps = {
  id?: string | null;
  children?: React.ReactNode;
};

export default function UserDataPanel({ id, children }: UserDataPanelProps) {
  const theme = useTheme();

  const { auth } = useContext(GlobalContext);
  const { data, loading, error } = useQuery<{ user: ApiUserType }>(GET_USER, {
    variables: {
      auth: auth.token,
      userId: id,
    },
  });

  if (loading || error)
    return (
      <div
        style={{
          width: 500,
          height: "100%",
          backgroundColor: theme.colors.brandQuaternary,
          display: "flex",
          flexDirection: "column",
        }}
      ></div>
    );
  if (!data) return <pre>{"No data"}</pre>;

  const name = data.user.firstName + " " + data.user.lastName;
  return (
    <div
      style={{
        width: 500,
        height: "100%",
        backgroundColor: theme.colors.brandQuaternary,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 200,
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          padding: 16,
          paddingBottom: 8,
          backgroundColor: theme.colors.brandPrimary,
          borderBottom: theme.colors.grayTertiary,
        }}
      >
        <Text fontWeight={600} color={"white"} fontSize={20}>
          {name}
        </Text>
      </div>
      <div style={{ padding: 30 }}>
        <ProfilePanelItem label="Email:" value={data.user.email} />
        <ProfilePanelItem
          label="Created:"
          value={dayjs(data.user.createdAt).format("MMMM DD, YYYY")}
        />
      </div>
      {children}
    </div>
  );
}

function ProfilePanelItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: 5 }}>
      <Text fontSize={16} color="graySecondary">
        {label}
      </Text>
      <Text fontSize={16} ml="small">
        {value}
      </Text>
    </div>
  );
}
