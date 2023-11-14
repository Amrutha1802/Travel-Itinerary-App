import React from "react";
import { useUserContext } from "../../Contexts/UserContext";
import { useAuth } from "../../Contexts/AuthContext.js";
import NavBar from "../NavBar/NavBar.js";
import { Row } from "react-bootstrap";
import FavoritePlaceCard from "../FavoritePlaceCard/FavoritePlaceCard.js";
import "./Favorites.css";
const Favorites = () => {
  const { getFavoritesByUserEmail } = useUserContext();
  const { user } = useAuth();
  const favorites = getFavoritesByUserEmail(user?.email);
  return (
    <div>
      <NavBar />
      <h1>Explore your Favorite Places</h1>
      <Row xs={1} lg={3} md={2}>
        {favorites?.map((place) => {
          if (!place) {
            return null;
          }
          return (
            <FavoritePlaceCard
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
};

export default Favorites;
