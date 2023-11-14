import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext.js";
import { Row } from "react-bootstrap";
import { useUserContext } from "../../Contexts/UserContext.js";
import TripPlaceCard from "./TripPlaceCard.js";

function ItineraryPlaces({ tripState, tripDates, date }) {
  const { user } = useAuth();
  const { fetchItPlaces } = useUserContext();
  const [places, setPlaces] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPlaces = await fetchItPlaces(
        user.email,
        tripState,
        tripDates,
        date
      );
      setPlaces(fetchedPlaces);
    };

    fetchData();
  }, [user.email, tripState, tripDates, date, fetchItPlaces]);

  return (
    <div>
      <Row xs={1} lg={3} md={3}>
        {places ? (
          places.length > 0 ? (
            places[0].map((place, placeIndex) => (
              <div key={placeIndex}>
                <h2>{place.name}</h2>
                <TripPlaceCard
                  imageUrl={place.url}
                  placeName={place.name}
                  date={date}
                  timings={place.time}
                  tripState={tripState}
                  tripDates={tripDates}
                />
              </div>
            ))
          ) : (
            <p>No places added</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </div>
  );
}

export default ItineraryPlaces;
