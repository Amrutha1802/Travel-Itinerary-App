import React from "react";
import "./States.css";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import StateImageCard from "../StateImageCard/StateImageCard.js";
import useFetchStates from "../../../../hooks/useFetchStates.js";

const States = () => {
  const { areStatesLoading, isError, statesData, territoriesData } =
    useFetchStates();
  if (areStatesLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  return (
    <div>
      <div>
        <h1 className="m-5">States</h1>
        <Row xs={1} lg={3} md={3}>
          {statesData?.map((state) => {
            return (
              <Link
                key={state.id}
                to={`/tourist-places-in/${state.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${state.id}`}
                className="link"
              >
                <StateImageCard
                  key={state.id}
                  id={state.id}
                  logo={state.url}
                  name={state.name}
                  description={state.description}
                />
              </Link>
            );
          })}
        </Row>
      </div>
      <div>
        <h1 className="m-5">Territories</h1>
        <Row xs={1} lg={3}>
          {territoriesData?.map((state) => {
            return (
              <Link
                key={state.id}
                to={`/tourist-places-in/${state.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${state.id}`}
                className="link"
              >
                <StateImageCard
                  key={state.id}
                  id={state.id}
                  logo={state.url}
                  name={state.name}
                  description={state.description}
                />
              </Link>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default States;
