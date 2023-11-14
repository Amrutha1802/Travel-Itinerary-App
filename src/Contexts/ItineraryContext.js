import React, { createContext, useContext, useState } from "react";

const ItineraryContext = createContext();

export const useItineraryContext = () => {
  return useContext(ItineraryContext);
};
export const ItineraryDataProvider = ({ children }) => {
  const [notes, setNotes] = useState("");
  const [itineraryPlaces, setItineraryPlaces] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState("");
  const contextValue = {
    itineraryPlaces,
    setItineraryPlaces,
    expenses,
    setExpenses,
    budget,
    setBudget,
    notes,
    setNotes,
  };
  return (
    <ItineraryContext.Provider value={contextValue}>
      {children}
    </ItineraryContext.Provider>
  );
};
