import React from "react";
import { Form, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "react-query";
import "./StateSelector.css";
import { usePlanContext } from "../../Contexts/PlanContext.js";

const fetchStates = async () => {
  const response = await axios.get(`http://localhost:4000/states`);
  return response.data;
};
const StateSelector = () => {
  const { selectedState, showStates, handleStateChange, handleStateClick } =
    usePlanContext();
  const {
    data: statesData,
    isLoading: areStatesLoading,
    isError,
  } = useQuery(["states"], () => fetchStates());
  if (areStatesLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading States data</div>;
  }

  return (
    <Form.Group>
      <div className="container">
        <div className="label">
          <Form.Label>Where to</Form.Label>
        </div>
        <div className="input-form">
          <div className="form">
            <Form.Control
              type="text"
              value={selectedState}
              onChange={handleStateChange}
              style={{ width: "300px" }}
            />
          </div>
          <div>
            {showStates && (
              <div className="suggestions-container">
                <div className="suggestions">
                  <ListGroup>
                    {statesData
                      .filter((state) =>
                        state.name
                          .toLowerCase()
                          .includes(selectedState.toLowerCase())
                      )
                      .map((state, index) => (
                        <ListGroup.Item
                          key={index}
                          action
                          onClick={() => handleStateClick(state.name)}
                        >
                          {state.name}
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Form.Group>
  );
};

export default StateSelector;
