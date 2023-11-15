import React from "react";
import { Form, ListGroup } from "react-bootstrap";
import { usePlanContext } from "../../../../Contexts/PlanContext.js";
import useFetchStates from "../../../../hooks/useFetchStates.js";
import "./StateSelector.css";
const StateSelector = () => {
  const { selectedState, showStates, handleStateChange, handleStateClick } =
    usePlanContext();
  const { states, areStatesLoading, isError } = useFetchStates();
  if (areStatesLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
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
                    {states
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
