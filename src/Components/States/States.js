import React from "react";
import "./States.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Row } from "react-bootstrap";
import StateImageCard from "../StateImageCard/StateImageCard.js";

const fetchStates = async () => {
  const response = await axios.get(`http://localhost:4000/states`);
  return response.data;
};
const States = () => {
  const {
    data: states,
    isLoading: areStatesLoading,
    isError,
  } = useQuery(["states"], () => fetchStates());
  if (areStatesLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  const statesData = states.filter((item) => item.type === "state");
  const territoriesData = states.filter((item) => item.type === "territory");

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
