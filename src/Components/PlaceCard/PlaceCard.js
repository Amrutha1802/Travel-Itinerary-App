import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../StateImageCard/StateImageCard.css";
import { useUserContext } from "../../Contexts/UserContext.js";
import { useAuth } from "../../Contexts/AuthContext.js";

const PlaceCard = ({ id, images, name, review, description }) => {
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const { user } = useAuth();
  const { setFavoritesInLocalStorage } = useUserContext();
  const handleAddToFavorites = () => {
    setFavoritesInLocalStorage(
      user.email,
      id,
      images,
      name,
      review,
      description
    );
    setIsAddedToFavorites(true);
  };
  return (
    <Col key={id} className="d-flex">
      <Card className="mx-5 my-3 card-container shadow">
        <div className="image-container">
          <Card.Img
            className="card-image"
            variant="top"
            src={images[0].url}
            alt={name}
          />
        </div>
        <div className="position-absolute top-0 end-0 p-2">
          <div className="bg-white text-dark p-2">
            <strong>{review}</strong>/5
          </div>
        </div>
        <Card.Body>
          <Card.Title className="text-center mt-2 mb-4">{name}</Card.Title>
          <hr />
          <span title={description}>
            <Card.Text className="d-flex justify-content-around">
              {description?.substring(0, 100)}...
            </Card.Text>
          </span>
          <div className="d-flex justify-content-between mt-3">
            <Button
              className="btn"
              onClick={handleAddToFavorites}
              disabled={isAddedToFavorites}
            >
              {isAddedToFavorites ? "Added to Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PlaceCard;
