import React, { createContext, useContext, useState } from "react";
import moment from "moment";

const DateContext = createContext();

export function useDateContext() {
  return useContext(DateContext);
}

export function DateContextProvider({ children }) {
  const [selectedDates, setSelectedDates] = useState([]);
  const handleDateChange = (dates) => {
    setSelectedDates(dates.map((date) => date.format("YYYY-MM-DD")));
  };
  const formatTime = (date) => {
    return date
      ? `${String(date.getHours()).padStart(2, "0")}:${String(
          date.getMinutes()
        ).padStart(2, "0")}`
      : null;
  };
  const generateDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = moment(startDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");

    while (currentDate.isSameOrBefore(end)) {
      dates.push({
        date: currentDate.format("YYYY-MM-DD"),
        day: currentDate.format("dddd"),
      });
      currentDate.add(1, "day");
    }

    return dates;
  };

  return (
    <DateContext.Provider
      value={{
        selectedDates,
        setSelectedDates,
        handleDateChange,
        generateDatesInRange,
        formatTime,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}
