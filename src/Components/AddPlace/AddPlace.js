import React, { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Space, TimePicker } from "antd";
import { useUserContext } from "../../Contexts/UserContext.js";
import { useAuth } from "../../Contexts/AuthContext.js";
import { useDateContext } from "../../Contexts/DateContext.js";
import { useItineraryContext } from "../../Contexts/ItineraryContext";
import { useTripPlanContext } from "../../Contexts/TripPlanContext.js";
import "./AddPlace.css";

function AddPlace({
  places,
  dateInfo,
  flag = "new",
  stateName = "default",
  firstDate = "default",
  lastDate = "default",
}) {
  const { user } = useAuth();
  const { formatTime } = useDateContext();
  const [touristPlace, setTouristPlace] = useState("");
  const { itineraryPlaces, setItineraryPlaces } = useItineraryContext();
  const [showPlaces, setShowPlaces] = useState(false);
  const { getPlanByEmailAndDates } = useUserContext();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const isPlaceSelected = false;
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [selectedTime, setSelectedTime] = useState([]);
  const [disableAdd, setDisableAdd] = useState(false);
  const { setPlans } = useTripPlanContext();
  const [updatedUsers, setUpdatedUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  function addPlaceToUserPlan(
    email,
    state,
    tripStartDate,
    tripEndDate,
    date,
    name,
    url,
    time
  ) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newPlace = { name, url };
    newPlace.time = time;
    setUpdatedUsers(
      users.map((user) => {
        if (user.email === email && user.plans) {
          user.plans.forEach((plan) => {
            if (
              plan.state === state &&
              plan.tripDates[0] === tripStartDate &&
              plan.tripDates[1] === tripEndDate
            ) {
              if (!plan.itineraryPlaces) {
              }
              const itineraryIndex = plan.itineraryPlaces.findIndex(
                (itinerary) => itinerary.date === date
              );
              if (itineraryIndex < 0) {
                const object = { date };
                plan.itineraryPlaces.push(object);
                const index = plan.itineraryPlaces.findIndex(
                  (itinerary) => itinerary.date === date
                );
                plan.itineraryPlaces[index].places = [newPlace];
              }
              if (itineraryIndex !== -1) {
                plan.itineraryPlaces[itineraryIndex].places.push(newPlace);
              }
            }
          });
        }
        return user;
      })
    );
  }
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }, [updatedUsers]);
  const handlePlaceChange = (e) => {
    const value = e.target.value;
    setTouristPlace(value);
    setShowPlaces(value.length > 0);
  };
  const handlePlaceClick = (touristPlace) => {
    setTouristPlace(touristPlace);
    setShowPlaces(false);
    const foundPlace = places.find(
      (place) => place.name.toLowerCase() === touristPlace.toLowerCase()
    );
    setSelectedPlace(foundPlace);
  };
  const handleAdd = async () => {
    await addPlaceToUserPlan(
      user.email,
      stateName,
      firstDate,
      lastDate,
      dateInfo.date,
      selectedPlace.name,
      selectedPlace.images[0].url,
      selectedTime
    );
    setPlans(
      getPlanByEmailAndDates(user.email, stateName, firstDate, lastDate)
    );
    setDisableAdd(true);
    setIsTimeSelected(true);
  };
  const handleTimeChange = (time, timeString) => {
    const foundPlace = places.find(
      (place) => place.name.toLowerCase() === touristPlace.toLowerCase()
    );
    const updatedItineraryPlaces = [...itineraryPlaces];
    const existingDateIndex = updatedItineraryPlaces.findIndex(
      (item) => item.date === dateInfo.date
    );
    const [startTimeMoment, endTimeMoment] = time;
    const startTime = startTimeMoment ? startTimeMoment.toDate() : null;
    const endTime = endTimeMoment ? endTimeMoment.toDate() : null;
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    if (flag !== "edit") {
      if (existingDateIndex !== -1) {
        updatedItineraryPlaces[existingDateIndex].places.push({
          name: foundPlace.name,
          url: foundPlace.images[0].url,
          time: [formattedStartTime, formattedEndTime],
        });
      } else {
        updatedItineraryPlaces.push({
          date: dateInfo.date,
          places: [
            {
              name: foundPlace.name,
              url: foundPlace.images[0].url,
              time: [formattedStartTime, formattedEndTime],
            },
          ],
        });
      }
      setIsTimeSelected(true);
    } else {
      setSelectedTime([formattedStartTime, formattedEndTime]);
    }
    setItineraryPlaces(updatedItineraryPlaces);
  };
  return (
    <div className="body">
      <Form>
        {!isPlaceSelected && !isTimeSelected && (
          <Form.Group>
            <Form.Control
              type="text"
              style={{ width: "500px" }}
              value={touristPlace}
              placeholder={`Add a place`}
              onChange={handlePlaceChange}
            />
            <div>
              {showPlaces && (
                <div className="suggestions-container">
                  <div className="suggestions">
                    <ListGroup className="sug-dropdown">
                      {places
                        .filter((state) =>
                          state.name
                            .toLowerCase()
                            .includes(touristPlace.toLowerCase())
                        )
                        .map((state, index) => (
                          <ListGroup.Item
                            key={index}
                            action
                            onClick={() => handlePlaceClick(state.name)}
                          >
                            {state.name}
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </div>
                </div>
              )}
            </div>
            <div className="time-picker">
              <p style={{ marginTop: "10px", marginRight: "10px" }}>
                Select Timings :{" "}
              </p>
              <Space direction="vertical" style={{ marginTop: "10px" }}>
                <TimePicker.RangePicker
                  status="warning"
                  onChange={handleTimeChange}
                  format="HH:mm"
                />
              </Space>
            </div>
            {flag === "edit" && (
              <>
                <button
                  className="button-style add-btn"
                  onClick={handleAdd}
                  disabled={disableAdd}
                >
                  Add
                </button>
              </>
            )}
          </Form.Group>
        )}
      </Form>
    </div>
  );
}

export default AddPlace;
