import React from "react";
import { useState } from "react";
import PlanForm from "../PlanForm/PlanForm";
import "./PlanNewTripButton.css";
function PlanNewTripButton() {
  const [showPlanFormComponent, setShowPlanFormComponent] = useState(false);

  const handleClick = () => {
    setShowPlanFormComponent(!showPlanFormComponent);
  };
  return (
    <>
      <button className="button-style" onClick={handleClick}>
        Plan new Trip +
      </button>
      {showPlanFormComponent && <PlanForm />}
    </>
  );
}

export default PlanNewTripButton;
