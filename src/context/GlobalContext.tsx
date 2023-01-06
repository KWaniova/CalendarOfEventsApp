import { Dayjs } from "dayjs";
import React from "react";
import { EventType } from "src/types/Event";

export type AuthType = {
  token?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
};

export const authInitialState = {
  token: undefined,
  id: undefined,
  firstName: undefined,
  lastName: undefined,
};

const GlobalContext = React.createContext<{
  monthIndex: number;
  auth: AuthType;
  setAuth: (auth: AuthType) => void;
  setMonthIndex: (index: number) => void;
  // smallCalendarMonth: 0;
  // setSmallCalendarMonth: (index) => {};
  daySelected: null | Dayjs;
  setDaySelected: React.Dispatch<React.SetStateAction<Dayjs>>;
  showEventModal: boolean;
  setShowEventModal: (value: boolean) => void;
  dispatchCalEvent: ({ type, payload }: { type: any; payload: any }) => void;
  savedEvents: EventType[];
  selectedEvent: null | EventType;
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventType | null>>;
  // setLabels: () => void;
  setToken: (token: string, userId: string) => void;
  setReload:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((item: boolean) => void);
  filteredEvents: EventType[];
  logOut: () => void;
}>({
  logOut: () => {},
  monthIndex: 0,
  auth: authInitialState,
  setAuth: (auth: AuthType) => {},
  setMonthIndex: (index) => {},
  // smallCalendarMonth: 0,
  // setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  // setLabels: () => {},
  setToken: (token: string, userId: string) => {},
  // labels: [],
  // updateLabel: () => {},
  setReload: () => {},
  filteredEvents: [],
});

export default GlobalContext;
