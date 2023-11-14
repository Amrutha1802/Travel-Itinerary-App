import { Card } from "react-bootstrap";
import React from "react";
import { Space, TimePicker } from "antd";
import moment from "moment";
import { useTripPlanContext } from "../../Contexts/TripPlanContext.js";
import { useUserContext } from "../../Contexts/UserContext.js";
import { useAuth } from "../../Contexts/AuthContext.js";
import "./TripPlan.css";

function TripPlaceCard({
  imageUrl,
  placeName,
  date,
  timings,
  tripState,
  tripDates,
}) {
  const { user } = useAuth();
  const { addTimingsToPlace } = useUserContext();
  const { plans, setPlans } = useTripPlanContext();
  const removePlaceFromLocalStorage = (
    email,
    state,
    tripStartDate,
    tripEndDate,
    placeName,
    date,
    imageUrl,
    timings
  ) => {
    let updatedPlan = {
      state: plans.state,
      itineraryPlaces: plans.itineraryPlaces.map((itineraryPlace) => {
        if (itineraryPlace.date === date) {
          let updatedPlaces = itineraryPlace.places.filter(
            (place) =>
              !(
                place.name === placeName &&
                place.url === imageUrl &&
                place.time === timings
              )
          );
          return {
            date: itineraryPlace.date,
            places: updatedPlaces,
          };
        } else {
          return { ...itineraryPlace };
        }
      }),
    };
    setPlans(updatedPlan);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.email === email && user.plans) {
        user.plans.forEach((plan) => {
          if (
            plan.state === state &&
            plan.tripDates[0] === tripStartDate &&
            plan.tripDates[1] === tripEndDate
          ) {
            if (plan.itineraryPlaces) {
              plan.itineraryPlaces.forEach((itinerary) => {
                if (itinerary.date === date) {
                  const foundIndex = itinerary.places.findIndex(
                    (place) =>
                      place.name === placeName &&
                      place.url === imageUrl &&
                      place.time[0] === timings[0] &&
                      place.time[1] === timings[1]
                  );
                  console.log("foundddddd", foundIndex);
                  if (foundIndex !== -1) {
                    itinerary.places.splice(foundIndex, 1);
                  }
                }
              });
            }
          }
        });
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleTimeChange = (value, placeName, date) => {
    if (value !== null) {
      addTimingsToPlace(
        user.email,
        tripState,
        tripDates[0],
        tripDates[1],
        placeName,
        date,
        value[0].format("HH:mm"),
        value[1].format("HH:mm")
      );
    }
  };
  const handleRemovePlace = async () => {
    await removePlaceFromLocalStorage(
      user.email,
      tripState,
      tripDates[0],
      tripDates[1],
      placeName,
      date,
      imageUrl,
      timings
    );
  };

  return (
    <div>
      <Card className="mx-5 my-5 shadow" variant="top">
        <div className="image-container">
          <Card.Img
            className="card-image"
            variant="top"
            src={imageUrl}
            alt={placeName}
          />
        </div>
        <div className="buttons-container">
          <Card.Title
            className="text-center mt-3 mb-1 text-break state-name"
            style={{ color: "black" }}
          >
            {placeName}
          </Card.Title>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "20px", marginTop: "15px" }}>Timings</p>
            <Space direction="vertical" style={{ marginTop: "5px" }}>
              <TimePicker.RangePicker
                status="warning"
                format="HH:mm"
                onChange={(value) => handleTimeChange(value, placeName, date)}
                defaultValue={
                  timings &&
                  timings.length === 2 &&
                  timings[0] !== null &&
                  timings[1] !== null
                    ? [moment(timings[0], "HH:mm"), moment(timings[1], "HH:mm")]
                    : undefined
                }
              />
            </Space>
          </div>
          <button
            className=" remove-btn button-style"
            onClick={handleRemovePlace}
          >
            Remove
          </button>
        </div>
      </Card>
    </div>
  );
}

export default TripPlaceCard;
