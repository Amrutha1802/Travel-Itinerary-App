import React from "react";
import NavBar from "../NavBar/NavBar.js";
import States from "../States/States.js";
import PlanNewTripButton from "../PlanNewTripButton/PlanNewTripButton.js";

const Home = () => {
  return (
    <div>
      <NavBar />
      <PlanNewTripButton />
      <States />
    </div>
  );
};
export default Home;
