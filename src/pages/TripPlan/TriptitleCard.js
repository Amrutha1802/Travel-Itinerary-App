import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import "./TripPlan.css";

const TriptitleCard = ({
  flag = "new-plan",
  tripState = "Not Selected",
  selectedState = "Not Selected",
  tripDates = "Not Selected",
  selectedDates = "Not Selected",
}) => {
  return (
    <div>
      <Card className="state-img-card date-btn">
        <h1>Trip to {flag === "edit" ? tripState : selectedState}</h1>
        <Card.Body>
          <div>
            <button className="button-style">
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ marginRight: "5px" }}
              />
              {flag === "edit"
                ? `${tripDates[0]} - ${tripDates[1]}`
                : selectedDates
                ? `${selectedDates[0]} - ${selectedDates[1]}`
                : "No dates selected"}
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TriptitleCard;
