import { useContext } from "react";
import { client } from "src";
import {
  CREATE_PRIVATE_EVENT_MUTATION,
  CREATE_PUBLIC_EVENT_MUTATION,
  UPDATE_EVENT_MUTATION,
  DELETE_EVENT_MUTATION,
} from "src/api/mutations";
import GlobalContext from "src/context/GlobalContext";
import { EventFormData } from "./EventFormTemplate";

export default function useEventActions({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { selectedEvent, auth, setReload } = useContext(GlobalContext);

  const onSubmitCreateReq = (eventData: EventFormData) => {
    const { title, description, from, to, type } = eventData;

    if (type === "PRIVATE") {
      client
        .mutate({
          mutation: CREATE_PRIVATE_EVENT_MUTATION,
          variables: {
            auth: auth.token,
            event: {
              title,
              description,
              dateRange: { startDate: `${from}`, endDate: `${to}` },
            },
          },
        })
        .then((result) => {
          onSuccess();
          setReload?.(true);
        })
        .catch((err) => console.log(err));
    } else if (type === "PUBLIC") {
      client
        .mutate({
          mutation: CREATE_PUBLIC_EVENT_MUTATION,
          variables: {
            auth: auth.token,
            event: {
              title,
              description,
              dateRange: { startDate: `${from}`, endDate: `${to}` },
            },
          },
        })
        .then((result) => {
          onSuccess();
          setReload(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const onSubmitUpdateReq = (eventData: EventFormData) => {
    const { title, description, from, to, type } = eventData;
    client
      .mutate({
        mutation: UPDATE_EVENT_MUTATION,
        variables: {
          auth: auth.token,
          event: {
            id: selectedEvent?.id,
            type: type,
            title,
            description,
            dateRange: {
              startDate: `${from}`,
              endDate: `${to}`,
            },
          },
        },
      })
      .then((result) => {
        onSuccess();
        setReload(true);
      })
      .catch((err) => console.log(err));
  };

  const onDelete = () => {
    client
      .mutate({
        mutation: DELETE_EVENT_MUTATION,
        variables: {
          auth: auth.token,
          eventId: selectedEvent?.id,
        },
      })
      .then((result) => {
        onSuccess();
        setReload(true);
      })
      .catch((err) => console.log(err));
  };

  return {
    onSubmitCreateReq,
    onSubmitUpdateReq,
    onDelete,
  };
}
