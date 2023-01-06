import { useState, useEffect, useReducer } from "react";
import GlobalContext, { authInitialState, AuthType } from "./GlobalContext";
import dayjs, { Dayjs } from "dayjs";
import { EventType } from "src/types/Event";
import { ApiEventType, GET_MY_EVENTS } from "src/api/queries";
import { client } from "src";
import { ApolloQueryResult } from "@apollo/client";
import { redirect } from "react-router-dom";
import { LOGOUT } from "src/api/mutations";

type CreateAction = {
  type: "push";
  payload: EventType;
};

type UpdateAction = {
  type: "update";
  payload: EventType;
};

type DeleteAction = {
  type: "delete";
  payload: EventType;
};

type ActionType = CreateAction | UpdateAction | DeleteAction;

function savedEventsReducer(state: EventType[], { type, payload }: ActionType) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props: any) {
  const [auth, setAuth] = useState<AuthType>(
    (localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth") ?? "")) ??
      authInitialState
  );
  const [monthIndex, setMonthIndexX] = useState<number>(dayjs().month());
  const [eventsData, setEventsData] = useState<EventType[]>([]);

  const [daySelected, setDaySelected] = useState<Dayjs>(dayjs());
  const [showEventModal, setShowEventModalState] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const [reload, setReload] = useState(false);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    setMonthIndexX(dayjs().month());
  }, []);

  const logOut = () => {
    debugger;
    client
      .mutate({
        mutation: LOGOUT,
        variables: {
          auth: auth.token,
        },
      })
      .then(() => {
        setAuth(authInitialState);
        localStorage.removeItem("auth");
        redirect("/login");
      });
  };

  const setMonthIndex = (index: number) => {
    setMonthIndexX(index);
  };

  const setShowEventModal = (value: boolean) => {
    setShowEventModalState(value);
  };

  const getEvents = () => {
    client
      .query({
        query: GET_MY_EVENTS,
        variables: {
          auth: auth.token,
          from: dayjs(new Date(dayjs().year(), monthIndex)).format(
            "YYYY-MM-DDTHH:mm"
          ),
          to: dayjs(new Date(dayjs().year(), monthIndex + 1)).format(
            "YYYY-MM-DDTHH:mm"
          ),
        },
      })
      .then(
        (
          result: ApolloQueryResult<{
            myEvents: ApiEventType[];
          }>
        ) => {
          const events: EventType[] = result.data?.myEvents?.map((item) => ({
            ...item,
            title: item.title,
            description: item.description,
            from: dayjs(item.startDate).format("YYYY-MM-DDTHH:mm"),
            to: dayjs(item.endDate).format("YYYY-MM-DDTHH:mm"),
          }));

          setEventsData(events);
        }
      )
      .catch((err) => {
        console.log("GET EVENTS ERR: ", err);
      });
  };

  useEffect(() => {
    if (reload) {
      setReload(false);
      getEvents();
    }
  }, [reload]);

  useEffect(() => {
    if (auth.token) {
      getEvents();
    }
  }, [monthIndex, auth.token]);

  // useEffect(() => {
  //   if (smallCalendarMonth !== null) {
  //     setMonthIndex(smallCalendarMonth);
  //   }
  // }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  // function updateLabel(label) {
  //   setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  // }

  const setToken = (token: string, userId: string) => {
    setAuth((state) => ({ ...state, token: token, userId: userId }));
    localStorage.setItem("auth", JSON.stringify({ token, userId }));
  };
  return (
    <GlobalContext.Provider
      value={{
        setReload,
        monthIndex,
        setMonthIndex,
        // smallCalendarMonth,
        // setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        // setLabels,
        // labels,
        // updateLabel,
        filteredEvents: eventsData,
        auth,
        setAuth,
        setToken,
        logOut,
      }}
    >
      {props?.children}
    </GlobalContext.Provider>
  );
}

/*
TODO:
przi create event wracac id
ulozyc do local state
dorobic create eventy 
dorobic edit profile
potym connections
a kichac uz na to!
*/
