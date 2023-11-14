import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useDateContext } from "../../Contexts/DateContext";
import { useItineraryContext } from "../../Contexts/ItineraryContext.js";
import { useAuth } from "../../Contexts/AuthContext.js";
import { usePlanContext } from "../../Contexts/PlanContext.js";
import { useUserContext } from "../../Contexts/UserContext.js";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Row, Card, Form, Alert } from "react-bootstrap";
import TripPlaceCard from "./TripPlaceCard.js";
import AddPlace from "../AddPlace/AddPlace";
import BudgetTracker from "../BudgetTracker/BudgetTracker.js";
import PlaceCard from "../PlaceCard/PlaceCard.js";
import TriptitleCard from "./TriptitleCard.js";
import "./TripPlan.css";
import AddedPlaceCard from "./AddedPlaceCard.js";
import { useTripPlanContext } from "../../Contexts/TripPlanContext.js";

const fetchPlaces = async () => {
  const response = await axios.get(`http://localhost:4000/tourist-places`);
  return response.data;
};
const TripPlan = ({
  flag,
  tripState = "No State Selected",
  tripDates = "No Dates Selected",
  tripBudget = "Budget Is Not Set",
  tripExpenses = "Expenses Not Selected",
  tripNotes = "Notes is not Set",
}) => {
  const { selectedState } = usePlanContext();
  const { notes, setNotes, itineraryPlaces, budget, expenses } =
    useItineraryContext();
  const [notesOfTrip, setNotesOfTrip] = useState(tripNotes);
  const {
    addItineraryDetailsToLocalStorage,
    setNotesOfPlan,
    getPlanByEmailAndDates,
  } = useUserContext();
  const { user } = useAuth();
  const { selectedDates, generateDatesInRange } = useDateContext();
  const navigate = useNavigate();
  const datesInRange = generateDatesInRange(selectedDates[0], selectedDates[1]);
  const planDatesInRange = generateDatesInRange(tripDates[0], tripDates[1]);
  const [itineraryComponents, setItineraryComponents] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [message, setMessage] = useState(false);
  const { plans, setPlans } = useTripPlanContext();
  useEffect(() => {
    if (flag === "edit") {
      setNotesOfPlan(
        user.email,
        notesOfTrip,
        tripState,
        tripDates[0],
        tripDates[1]
      );
      setPlans(
        getPlanByEmailAndDates(
          user.email,
          tripState,
          tripDates[0],
          tripDates[1]
        )
      );
    }
  }, [
    notesOfTrip,
    flag,
    tripDates,
    tripState,
    user.email,
    setNotesOfPlan,
    getPlanByEmailAndDates,
    setPlans,
  ]);
  const handleAccordionChange = (eventKey) => {
    setActiveItem(eventKey);
  };

  const {
    data: places,
    isLoading: arePlacesLoading,
    isError,
  } = useQuery(["places"], () => fetchPlaces());
  if (arePlacesLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  const stateName = flag === "edit" ? tripState : selectedState;
  const touristPlaces = places?.filter(
    (place) => place.statename === stateName
  );

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
  };

  const handleNotesOfTripChange = (e) => {
    setNotesOfTrip(e.target.value);
  };

  const handleClickSavePlan = () => {
    addItineraryDetailsToLocalStorage(
      user.email,
      selectedState,
      selectedDates,
      notes,
      itineraryPlaces,
      budget,
      expenses
    );
    setMessage(true);
  };

  const handleViewPlans = () => {
    navigate("/plans");
  };
  const addPlaceToItinerary = (index, dateInfo) => {
    const newComponents = [...itineraryComponents];
    if (flag === "edit") {
      newComponents[index] = [
        ...(newComponents[index] || []),
        <AddPlace
          key={newComponents[index]?.length || 0}
          places={touristPlaces}
          dateInfo={dateInfo}
          flag="edit"
          stateName={tripState}
          firstDate={tripDates[0]}
          lastDate={tripDates[1]}
        />,
      ];
    } else {
      newComponents[index] = [
        ...(newComponents[index] || []),
        <AddPlace
          key={newComponents[index]?.length || 0}
          places={touristPlaces}
          dateInfo={dateInfo}
        />,
      ];
    }
    setItineraryComponents(newComponents);
  };

  const divStyle = {
    backgroundImage:
      'url("https://www.holidify.com/images/bgImages/ARAKU-VALLEY.jpg")',
  };

  return (
    <div className="plan-card-container">
      <Card className="plan-card-style">
        <div className="plan-background-image" style={divStyle}>
          <TriptitleCard
            flag={flag}
            tripState={tripState}
            selectedState={selectedState}
            tripDates={tripDates}
            selectedDates={selectedDates}
          />
        </div>
        <Card.Body>
          <div>
            <div className="trip-plan-container">
              <Accordion
                className="custom-accordion"
                activeKey={activeItem}
                onSelect={handleAccordionChange}
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Notes</Accordion.Header>
                  <Accordion.Body>
                    {flag === "edit" ? (
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={notesOfTrip}
                          onChange={handleNotesOfTripChange}
                        />
                      </Form.Group>
                    ) : (
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={notes}
                          onChange={handleNotesChange}
                        />
                      </Form.Group>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Explore Places</Accordion.Header>
                  <Accordion.Body>
                    <div className="places-container">
                      <Row xs={1} lg={3} md={2}>
                        {touristPlaces?.map((place) => {
                          if (!place) {
                            return null;
                          }
                          return (
                            <PlaceCard
                              key={place.id}
                              id={place.id}
                              images={place.images}
                              name={place.name}
                              review={place.review}
                              description={place.description}
                            />
                          );
                        })}
                      </Row>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Itinery</Accordion.Header>
                  <Accordion.Body>
                    <div className="places-container">
                      {flag === "edit" ? (
                        planDatesInRange && planDatesInRange.length > 0 ? (
                          planDatesInRange.map((dateInfo, index) => (
                            <Accordion key={index}>
                              <Accordion.Item eventKey={index.toString()}>
                                <Accordion.Header>
                                  {dateInfo.date}-{dateInfo.day}
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div>
                                    <div>
                                      <Row xs={1} lg={3} md={3}>
                                        {plans.itineraryPlaces?.map(
                                          (itineraryPlace) =>
                                            itineraryPlace.date ===
                                            dateInfo.date
                                              ? itineraryPlace.places.map(
                                                  (place, placeIndex) => (
                                                    <div key={placeIndex}>
                                                      <TripPlaceCard
                                                        imageUrl={place.url}
                                                        placeName={place.name}
                                                        date={dateInfo.date}
                                                        timings={place.time}
                                                        tripState={tripState}
                                                        tripDates={tripDates}
                                                      />
                                                    </div>
                                                  )
                                                )
                                              : null
                                        )}
                                      </Row>
                                    </div>
                                  </div>
                                  <div>
                                    {itineraryComponents[index]?.map(
                                      (component, componentIndex) => (
                                        <div
                                          key={componentIndex}
                                          className="component-item"
                                        >
                                          {component}
                                        </div>
                                      )
                                    )}
                                  </div>
                                  <button
                                    className="button-style"
                                    onClick={() =>
                                      addPlaceToItinerary(index, dateInfo)
                                    }
                                  >
                                    Add a Place
                                  </button>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          ))
                        ) : (
                          <div>no places</div>
                        )
                      ) : datesInRange && datesInRange.length > 0 ? (
                        datesInRange.map((dateInfo, index) => (
                          <Accordion key={index}>
                            <Accordion.Item eventKey={index.toString()}>
                              <Accordion.Header>
                                {dateInfo.date}-{dateInfo.day}
                              </Accordion.Header>
                              <Accordion.Body>
                                <Row xs={1} lg={3} md={3}>
                                  {itineraryPlaces &&
                                    itineraryPlaces.length > 0 &&
                                    itineraryPlaces.map((item) => {
                                      if (item.date === dateInfo.date) {
                                        return item.places.map(
                                          (place, index) => (
                                            <AddedPlaceCard
                                              key={index}
                                              name={place.name}
                                              imageUrl={place.url}
                                              timings={place.time}
                                            />
                                          )
                                        );
                                      }
                                      return null;
                                    })}
                                </Row>
                                <div className="component-container">
                                  {itineraryComponents[index]?.map(
                                    (component, componentIndex) => (
                                      <div
                                        key={componentIndex}
                                        className="component-item"
                                      >
                                        {component}
                                      </div>
                                    )
                                  )}
                                </div>
                                <button
                                  className="button-style"
                                  onClick={() =>
                                    addPlaceToItinerary(index, dateInfo)
                                  }
                                >
                                  Add a Place
                                </button>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        ))
                      ) : (
                        <div>No dates available.</div>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Budgeting</Accordion.Header>
                  <Accordion.Body>
                    {flag === "edit" ? (
                      <BudgetTracker
                        flag={flag}
                        tripBudget={tripBudget}
                        tripState={tripState}
                        tripDates={tripDates}
                        tripExpenses={tripExpenses}
                      />
                    ) : (
                      <BudgetTracker />
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </Card.Body>
      </Card>
      {flag !== "edit" && (
        <div className="buttons-container">
          <button className="button-style" onClick={handleClickSavePlan}>
            Save-Plan
          </button>
          {message && (
            <Alert variant="success" style={{ marginTop: "20px" }}>
              Plan Saved
            </Alert>
          )}
          <button className="button-style" onClick={handleViewPlans}>
            View Plans
          </button>
        </div>
      )}
    </div>
  );
};

export default TripPlan;
