import React, { useState, useContext, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import CalendarHeader from "./components/CalendarHeader";
import EventModal from "./components/EventModal";
import Month from "./components/Month";
import Sidebar from "./components/Sidebar";
import GlobalContext from "./context/GlobalContext";
import { getMonth } from "./utils/getMonth";

import "./App.css";

const FILMS_QUERY = gql`
  query Me {
    me(auth: "965ba223204c11a081fe2b611079d6dc") {
      id
      firstName
      lastName
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(FILMS_QUERY);
  console.log(data);
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  if (loading) return <>Loading...</>;
  if (error) return <pre>{error.message}</pre>;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "cyan",
        display: "flex",
      }}
    >
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </div>
  );
}
