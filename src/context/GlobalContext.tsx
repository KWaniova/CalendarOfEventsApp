// @ts-nocheck

import React from "react";

export type AuthType = {
  token?: string;
  firstName: string;
  lastName: string;
};

export const authInitialState = {
  token: undefined,
  firstName: undefined,
  lastName: undefined,
};

const GlobalContext = React.createContext({
  monthIndex: 0,
  auth: authInitialState,
  setAuth: (auth: AuthType) => {},
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],
});

export default GlobalContext;
