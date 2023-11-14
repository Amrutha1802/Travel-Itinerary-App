import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import BackgroundImage from "../BackgroundImage/BackgroundImage.js";
import "./TouristPlaces.css";
import NavBar from "../NavBar/NavBar.js";
import PlaceCard from "../PlaceCard/PlaceCard.js";
import { Row } from "react-bootstrap";

const fetchPlaces = async () => {
  const response = await axios.get(`http://localhost:4000/tourist-places`);
  return response.data;
};
const fetchState = async (id) => {
  const response = await axios.get(`http://localhost:4000/states/${id}`);
  return response.data;
};

export default function TouristPlaces() {
  const { stateId } = useParams();
  const stateIdInt = parseInt(stateId);
  const {
    data: places,
    isLoading: arePlacesLoading,
    isError,
  } = useQuery(["places"], () => fetchPlaces());
  const {
    data: state,
    isLoading: isStateLoading,
    isError: StateError,
  } = useQuery(["state"], () => fetchState(stateIdInt));
  if (arePlacesLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  if (isStateLoading) {
    return <div>Loading...</div>;
  }
  if (StateError) {
    return <div>Error loading state</div>;
  }
  const touristPlaces = places?.filter(
    (place) => place.stateid === parseInt(stateId)
  );
  return (
    <div className="body">
      <NavBar />
      <BackgroundImage url={state.url} description={state.name} />
      <p className="desc">{state.description}</p>
      <h1 className="dest-heading">
        Top Destinations and Attractions in {state.name}
      </h1>
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
  );
}
