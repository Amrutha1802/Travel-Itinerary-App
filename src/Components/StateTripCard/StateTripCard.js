import React from "react";
import { useAuth } from "../../Contexts/AuthContext.js";
import { useUserContext } from "../../Contexts/UserContext";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./StateTripCard.css";
import { useTripPlanContext } from "../../Contexts/TripPlanContext.js";

const StateTripCard = ({ statesData, state, tripDates }) => {
  const { user } = useAuth();
  const { setPlanDetails } = useTripPlanContext();
  const { removePlanOfUser } = useUserContext();
  const selectedState = statesData.filter((item) => item.name === state);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRemovePlan = async () => {
    setPlanDetails((prevPlanDetails) =>
      prevPlanDetails.filter(
        (plan) =>
          !(
            plan.state === state &&
            plan.tripDates[0] === tripDates[0] &&
            plan.tripDates[1] === tripDates[1]
          )
      )
    );
    await removePlanOfUser(user.email, state, tripDates);
  };
  return (
    <div>
      <Card className="mx-5 my-5 shadow" variant="top">
        <Link
          key={state.id}
          to={`trip-plan/${state.replace(/\s+/g, "-")}/${tripDates[0]}/${
            tripDates[1]
          }`}
          className="link"
        >
          <div className="image-container">
            <Card.Img
              className="card-image"
              variant="top"
              src={selectedState[0].url}
              alt={state}
            />
          </div>
        </Link>
        <Card.Body className="white">
          <Card.Title
            className="text-center mt-2 mb-4 text-break state-name"
            style={{ color: "black" }}
          >
            Trip to {state}
          </Card.Title>
          <hr />
          <Card.Text className="d-flex justify-content-center state-desc">
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ marginRight: "10px", marginTop: "3px" }}
            />
            {formatDate(tripDates[0])} - {formatDate(tripDates[1])}
            <button onClick={handleRemovePlan} className="delete-button">
              <FontAwesomeIcon icon={faTrash} style={{ color: "#5a5a5a" }} />
            </button>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StateTripCard;
