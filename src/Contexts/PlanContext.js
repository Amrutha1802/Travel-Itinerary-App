import React, { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export const usePlanContext = () => {
  return useContext(PlanContext);
};

export const PlanDataProvider = ({ children }) => {
  const [selectedState, setSelectedState] = useState("");
  const [showStates, setShowStates] = useState(false);
  const handleStateChange = (e) => {
    const value = e.target.value;
    setSelectedState(value);
    setShowStates(value.length > 0);
  };
  const handleStateClick = (state) => {
    setSelectedState(state);
    setShowStates(false);
  };
  const contextValue = {
    selectedState,
    showStates,
    setSelectedState,
    handleStateChange,
    handleStateClick,
  };

  return (
    <PlanContext.Provider value={contextValue}>{children}</PlanContext.Provider>
  );
};
