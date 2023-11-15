import React, { useEffect, useState } from "react";
import { usePlanContext } from "../../../../Contexts/PlanContext";
import { useDateContext } from "../../../../Contexts/DateContext.js";
import { useItineraryContext } from "../../../../Contexts/ItineraryContext.js";
import StateSelector from "../StateSelector/StateSelector";
import DateSelector from "../DateSelector/DateSelector.js";
import { useNavigate } from "react-router-dom";
import "./PlanForm.css";

const PlanForm = () => {
  const navigate = useNavigate();
  const { selectedState, setSelectedState } = usePlanContext();
  const { setSelectedDates, selectedDates } = useDateContext();
  const { setNotes, setItineraryPlaces, setExpenses, setBudget } =
    useItineraryContext();
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (
      selectedDates.length === 0 ||
      selectedState === null ||
      selectedState.trim() === ""
    ) {
      setError(true);
    } else {
      setNotes("");
      setItineraryPlaces([]);
      setExpenses([]);
      setBudget(0);
      navigate("/plan-a-new-trip");
    }
  };

  useEffect(() => {
    setSelectedState("");
    setSelectedDates([]);
  }, [setSelectedState, setSelectedDates]);

  return (
    <div>
      <StateSelector />
      <DateSelector />
      {error && (
        <p className="error">Please select State and Date to continue</p>
      )}
      <button className="button-style" onClick={handleClick}>
        Start Planning
      </button>
    </div>
  );
};

export default PlanForm;
