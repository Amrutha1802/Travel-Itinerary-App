import React from "react";
import NavBar from "../NavBar/NavBar.js";
import TripPlan from "../TripPlan/TripPlan.js";

const PlansPage = () => {
  return (
    <div>
      <NavBar />
      <TripPlan flag="new" />
    </div>
  );
};

export default PlansPage;
