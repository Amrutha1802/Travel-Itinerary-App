import React from "react";
import States from "./Components/States/States.js";
import PlanNewTripButton from "./Components/PlanNewTripButton/PlanNewTripButton.js";

const Home = () => {
  return (
    <div>
      <PlanNewTripButton />
      <States />
    </div>
  );
};
export default Home;
