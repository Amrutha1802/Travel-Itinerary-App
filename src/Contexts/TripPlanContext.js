import React, { createContext, useContext, useState } from "react";

const TripPlanContext = createContext();
export const useTripPlanContext = () => {
  return useContext(TripPlanContext);
};
export const TripPlanDataProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [planDetails, setPlanDetails] = useState([]);

  const contextValue = {
    plans,
    setPlans,
    planDetails,
    setPlanDetails,
  };
  return (
    <TripPlanContext.Provider value={contextValue}>
      {children}
    </TripPlanContext.Provider>
  );
};

export default TripPlanContext;
