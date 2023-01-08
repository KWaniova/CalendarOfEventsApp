import { useContext, useEffect, useState } from "react";
import GlobalContext from "src/context/GlobalContext";
import { useModalContext } from "src/context/ModalContext/Modal";

import { client } from "src";

import { ApiUserType, GET_USER } from "src/api/queries";
import EventFormTemplate, { EventFormData } from "./EventFormTemplate";
import useEventActions from "./useEventActions";
import dayjs from "dayjs";

export default function CreateEventModal() {
  const {
    setShowEventModal,
    daySelected,
    setSelectedEvent,
    selectedEvent,
    auth,
    setReload,
  } = useContext(GlobalContext);

  const { hide } = useModalContext();

  const onHide = () => {
    setSelectedEvent(null);
    hide();
  };

  const { onSubmitCreateReq, onDelete, onSubmitUpdateReq } = useEventActions({
    onSuccess: onHide,
  });

  const isMyEvent =
    !selectedEvent?.userId || auth?.userId === selectedEvent?.userId;
  const [userData, setUserData] = useState<null | ApiUserType>(null);
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent]);

  const getUser = () => {
    if (selectedEvent?.userId) {
      client
        .query({
          query: GET_USER,
          variables: {
            auth: auth.token,
            userId: selectedEvent?.userId,
          },
        })
        .then((result) => {
          setUserData(result.data.user);
        });
    }
  };

  async function onSubmit(values: EventFormData) {
    await client.resetStore();
    setReload(true);
    selectedEvent ? onSubmitUpdateReq(values) : onSubmitCreateReq(values);
    setShowEventModal(false);
    onHide();
  }

  const initialValues = {
    title: selectedEvent ? selectedEvent.title : "",
    description: selectedEvent ? selectedEvent.description : "",
    from: selectedEvent
      ? selectedEvent.from
      : dayjs(daySelected)?.format("YYYY-MM-DDTHH:mm") || "",
    to: selectedEvent
      ? selectedEvent.to
      : dayjs(daySelected)?.format("YYYY-MM-DDT23:59") || "",
    type: selectedEvent ? selectedEvent.type : "PRIVATE",
  };

  if (!selectedEvent?.userId) {
    return (
      <EventFormTemplate
        hide={onHide}
        isMyEvent={true}
        setShowEventModal={setShowEventModal}
        onSubmit={onSubmit}
        initialValues={initialValues}
        title={"Create an event"}
      />
    );
  } else if (isMyEvent) {
    return (
      <EventFormTemplate
        hide={onHide}
        isMyEvent={true}
        onDelete={onDelete}
        setShowEventModal={setShowEventModal}
        onSubmit={onSubmit}
        initialValues={initialValues}
        title={"Update event"}
      />
    );
  }

  return (
    <EventFormTemplate
      hide={onHide}
      createdBy={userData?.firstName + " " + userData?.lastName}
      setShowEventModal={setShowEventModal}
      onSubmit={onSubmit}
      initialValues={initialValues}
      title={"Event Detail"}
    />
  );
}
