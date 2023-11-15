import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext.js";
import { useUserContext } from "../../Contexts/UserContext.js";
import TripPlan from "../TripPlan/TripPlan.js";

const StatePlan = () => {
  const { user } = useAuth();
  const { stateName, firstDate, lastDate } = useParams();
  const { getPlanByEmailAndDates } = useUserContext();
  const plan = getPlanByEmailAndDates(
    user.email,
    stateName.replaceAll("-", " "),
    firstDate,
    lastDate
  );
  return (
    <div>
      <TripPlan
        flag="edit"
        tripState={plan.state}
        tripDates={plan.tripDates}
        tripBudget={plan.budget}
        tripExpenses={plan.expenses}
        tripItineraryPlaces={plan.itineraryPlaces}
        tripNotes={plan.notes}
      />
    </div>
  );
};

export default StatePlan;
