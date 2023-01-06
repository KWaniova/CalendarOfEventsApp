import { useMutation } from "@apollo/client";
import { CONNECTION_ACTIONS } from "src/api/mutations";

type IProps = {
  onSuccess: () => void;
};

export default function useConnectionRequestActions({ onSuccess }: IProps) {
  const [connectionRequestActions] = useMutation(CONNECTION_ACTIONS);

  const acceptConnectionRequest = async (connectionId: string) => {
    await connectionRequestActions({
      variables: {
        action: "ACCEPT",
        auth: JSON.parse(localStorage.getItem("auth") ?? "").token || "",
        connectionId,
      },
    })
      .then((data) => {
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectConnectionRequest = async (connectionId: string) => {
    await connectionRequestActions({
      variables: {
        action: "DECLINE",
        auth: JSON.parse(localStorage.getItem("auth") ?? "").token || "",
        connectionId,
      },
    })
      .then((data) => {
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    acceptConnectionRequest,
    rejectConnectionRequest,
  };
}
