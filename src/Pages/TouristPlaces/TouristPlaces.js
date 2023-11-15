import React from "react";
import { useParams } from "react-router-dom";
import BackgroundImage from "./Components/BackgroundImage/BackgroundImage.js";
import "./TouristPlaces.css";
import PlaceCard from "../../Common/Components/PlaceCard.js";
import { Row } from "react-bootstrap";
import useFetchTouristPlaces from "../../hooks/useFetchTouristPlaces.js";
import useFetchStateDetails from "../../hooks/useFetchStateDetails.js";

export default function TouristPlaces() {
  const { stateId } = useParams();
  const stateIdInt = parseInt(stateId);
  const { touristPlaces, arePlacesLoading, isPlacesLoadingError } =
    useFetchTouristPlaces();
  const { stateDetails, areStateDetailsLoading, isStateDetailsLoadingError } =
    useFetchStateDetails(stateIdInt);
  if (arePlacesLoading) {
    return <div>Loading...</div>;
  }
  if (isPlacesLoadingError) {
    return <div>Error loading data</div>;
  }
  if (areStateDetailsLoading) {
    return <div>Loading...</div>;
  }
  if (isStateDetailsLoadingError) {
    return <div>Error loading state</div>;
  }
  const touristPlacesOfState = touristPlaces?.filter(
    (place) => place.stateid === parseInt(stateId)
  );
  return (
    <div className="body">
      <BackgroundImage url={stateDetails.url} description={stateDetails.name} />
      <p className="desc">{stateDetails.description}</p>
      <h1 className="dest-heading">
        Top Destinations and Attractions in {stateDetails.name}
      </h1>
      <Row xs={1} lg={3} md={2}>
        {touristPlacesOfState?.map((place) => {
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
